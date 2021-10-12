// [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
// Author: Balazs Forian-Szabo
// MIT License

import { log } from './util';
import { Element } from './element';
import { Vibrato } from './vibrato';
import { Note } from './note';

// eslint-disable-next-line
function L(...args: any[]) {
  if (VibratoBracket.DEBUG) log('Vex.Flow.VibratoBracket', args);
}

/** `VibratoBracket` renders vibrato effect between two notes. */
export class VibratoBracket extends Element {
  /** To enable logging for this class. Set `Vex.Flow.VibratoBracket.DEBUG` to `true`. */
  static DEBUG: boolean;

  static get CATEGORY(): string {
    return 'VibratoBracket';
  }

  protected line: number;

  protected start?: Note;
  protected stop?: Note;
  protected renderOptions: {
    vibrato_width: number;
    wave_height: number;
    wave_girth: number;
    harsh: boolean;
    wave_width: number;
  };

  /**
   * Either the stop or start note must be set, or both of them.
   * An undefined value for the start or stop note indicates that the vibrato
   * is drawn from the beginning or until the end of the stave accordingly.
   */
  constructor(bracket_data: { stop?: Note; start?: Note }) {
    super();

    this.start = bracket_data.start;
    this.stop = bracket_data.stop;

    this.line = 1;

    this.renderOptions = {
      harsh: false,
      wave_height: 6,
      wave_width: 4,
      wave_girth: 2,
      vibrato_width: 0,
    };
  }

  /** Set line position of the vibrato bracket. */
  setLine(line: number): this {
    this.line = line;
    return this;
  }

  /** Set harsh vibrato bracket. */
  setHarsh(harsh: boolean): this {
    this.renderOptions.harsh = harsh;
    return this;
  }

  /** Draw the vibrato bracket on the rendering context. */
  draw(): void {
    const ctx = this.checkContext();
    this.setRendered();
    const y: number =
      (this.start && this.start.checkStave().getYForTopText(this.line)) ||
      (this.stop && this.stop.checkStave().getYForTopText(this.line)) ||
      0;
    // If start note is not set then vibrato will be drawn
    // from the beginning of the stave
    const start_x: number =
      (this.start && this.start.getAbsoluteX()) || (this.stop && this.stop.checkStave().getTieStartX()) || 0;
    // If stop note is not set then vibrato will be drawn
    // until the end of the stave
    const stop_x: number =
      (this.stop && this.stop.getAbsoluteX() - this.stop.getWidth() - 5) ||
      (this.start && this.start.checkStave().getTieEndX() - 10) ||
      0;

    this.renderOptions.vibrato_width = stop_x - start_x;

    L('Rendering VibratoBracket: start_x:', start_x, 'stop_x:', stop_x, 'y:', y);

    Vibrato.renderVibrato(ctx, start_x, y, this.renderOptions);
  }
}
