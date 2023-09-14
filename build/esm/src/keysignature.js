import { Element } from './element.js';
import { StaveModifier, StaveModifierPosition } from './stavemodifier.js';
import { Tables } from './tables.js';
import { defined } from './util.js';
export class KeySignature extends StaveModifier {
    static get CATEGORY() {
        return "KeySignature";
    }
    constructor(keySpec, cancelKeySpec, alterKeySpec) {
        super();
        this.accList = [];
        this.setKeySig(keySpec, cancelKeySpec, alterKeySpec);
        this.setPosition(StaveModifierPosition.BEGIN);
        this.glyphFontScale = Tables.lookupMetric('fontSize');
        this.glyphs = [];
        this.paddingForced = false;
    }
    convertToGlyph(acc, nextAcc, stave) {
        const code = Tables.accidentalCodes(acc.type);
        const glyph = new Element("KeySignature");
        glyph.setText(code);
        glyph.measureText();
        const extraWidth = 1;
        glyph.setYShift(stave.getYForLine(acc.line));
        if (this.glyphs.length > 0) {
            const prevGlyph = this.glyphs[this.glyphs.length - 1];
            glyph.setXShift(prevGlyph.getXShift() + prevGlyph.getWidth() + extraWidth);
        }
        this.glyphs.push(glyph);
        this.width += glyph.getWidth() + extraWidth;
    }
    cancelKey(spec) {
        this.formatted = false;
        this.cancelKeySpec = spec;
        return this;
    }
    convertToCancelAccList(spec) {
        const cancelAccList = Tables.keySignature(spec);
        const differentTypes = this.accList.length > 0 && cancelAccList.length > 0 && cancelAccList[0].type !== this.accList[0].type;
        const naturals = differentTypes ? cancelAccList.length : cancelAccList.length - this.accList.length;
        if (naturals < 1)
            return undefined;
        const cancelled = [];
        for (let i = 0; i < naturals; i++) {
            let index = i;
            if (!differentTypes) {
                index = cancelAccList.length - naturals + i;
            }
            const acc = cancelAccList[index];
            cancelled.push({ type: 'n', line: acc.line });
        }
        this.accList = cancelled.concat(this.accList);
        return {
            accList: cancelled,
            type: cancelAccList[0].type,
        };
    }
    addToStave(stave) {
        this.paddingForced = true;
        stave.addModifier(this);
        return this;
    }
    convertAccLines(clef, type, accList = this.accList) {
        let offset = 0.0;
        let customLines;
        switch (clef) {
            case 'soprano':
                if (type === '#')
                    customLines = [2.5, 0.5, 2, 0, 1.5, -0.5, 1];
                else
                    offset = -1;
                break;
            case 'mezzo-soprano':
                if (type === 'b')
                    customLines = [0, 2, 0.5, 2.5, 1, 3, 1.5];
                else
                    offset = 1.5;
                break;
            case 'alto':
                offset = 0.5;
                break;
            case 'tenor':
                if (type === '#')
                    customLines = [3, 1, 2.5, 0.5, 2, 0, 1.5];
                else
                    offset = -0.5;
                break;
            case 'baritone-f':
            case 'baritone-c':
                if (type === 'b')
                    customLines = [0.5, 2.5, 1, 3, 1.5, 3.5, 2];
                else
                    offset = 2;
                break;
            case 'bass':
            case 'french':
                offset = 1;
                break;
            default:
                break;
        }
        let i;
        if (typeof customLines !== 'undefined') {
            for (i = 0; i < accList.length; ++i) {
                accList[i].line = customLines[i];
            }
        }
        else if (offset !== 0) {
            for (i = 0; i < accList.length; ++i) {
                accList[i].line += offset;
            }
        }
    }
    getPadding(index) {
        if (!this.formatted)
            this.format();
        return this.glyphs.length === 0 || (!this.paddingForced && index < 2) ? 0 : this.padding;
    }
    getWidth() {
        if (!this.formatted)
            this.format();
        return this.width;
    }
    setKeySig(keySpec, cancelKeySpec, alterKeySpec) {
        this.formatted = false;
        this.keySpec = keySpec;
        this.cancelKeySpec = cancelKeySpec;
        this.alterKeySpec = alterKeySpec;
        return this;
    }
    alterKey(alterKeySpec) {
        this.formatted = false;
        this.alterKeySpec = alterKeySpec;
        return this;
    }
    convertToAlterAccList(alterKeySpec) {
        const max = Math.min(alterKeySpec.length, this.accList.length);
        for (let i = 0; i < max; ++i) {
            if (alterKeySpec[i]) {
                this.accList[i].type = alterKeySpec[i];
            }
        }
    }
    format() {
        const stave = this.checkStave();
        this.width = 0;
        this.glyphs = [];
        this.accList = Tables.keySignature(defined(this.keySpec));
        const accList = this.accList;
        const firstAccidentalType = accList.length > 0 ? accList[0].type : undefined;
        let cancelAccList;
        if (this.cancelKeySpec) {
            cancelAccList = this.convertToCancelAccList(this.cancelKeySpec);
        }
        if (this.alterKeySpec) {
            this.convertToAlterAccList(this.alterKeySpec);
        }
        if (this.accList.length > 0) {
            const clef = (this.position === StaveModifierPosition.END ? stave.getEndClef() : stave.getClef()) || stave.getClef();
            if (cancelAccList) {
                this.convertAccLines(clef, cancelAccList.type, cancelAccList.accList);
            }
            this.convertAccLines(clef, firstAccidentalType, accList);
            for (let i = 0; i < this.accList.length; ++i) {
                this.convertToGlyph(this.accList[i], this.accList[i + 1], stave);
            }
        }
        this.formatted = true;
    }
    draw() {
        const stave = this.checkStave();
        const ctx = stave.checkContext();
        if (!this.formatted)
            this.format();
        this.setRendered();
        this.applyStyle(ctx);
        ctx.openGroup('keysignature', this.getAttribute('id'));
        for (let i = 0; i < this.glyphs.length; i++) {
            const glyph = this.glyphs[i];
            glyph.renderText(ctx, this.x, 0);
        }
        ctx.closeGroup();
        this.restoreStyle(ctx);
    }
}
