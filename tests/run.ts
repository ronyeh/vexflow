/* eslint-disable */
// @ts-nocheck

import { Vex } from 'vex';
import { VexFlowTests } from './vexflow_test_helpers';
import { AccidentalTests } from './accidental_tests';
import { StaveNoteTests } from './stavenote_tests';
import { VoiceTests } from './voice_tests';
import { NoteHeadTests } from './notehead_tests';
import { TabNoteTests } from './tabnote_tests';
import { TickContextTests } from './tickcontext_tests';
import { ModifierContextTests } from './modifier_tests';
import { DotTests } from './dot_tests';
import { BendTests } from './bend_tests';
import { FormatterTests } from './formatter_tests';
import { FractionTests } from './fraction_tests';
import { ClefTests } from './clef_tests';
import { KeySignatureTests } from './keysignature_tests';
import { TimeSignatureTests } from './timesignature_tests';
import { StaveTieTests } from './stavetie_tests';
import { TabTieTests } from './tabtie_tests';
import { StaveTests } from './stave_tests';
import { TabStaveTests } from './tabstave_tests';
import { TabSlideTests } from './tabslide_tests';
import { BeamTests } from './beam_tests';
import { BarlineTests } from './barline_tests';
import { AutoBeamFormattingTests } from './auto_beam_formatting_tests';
import { GraceNoteTests } from './gracenote_tests';
import { GraceTabNoteTests } from './gracetabnote_tests';
import { VibratoTests } from './vibrato_tests';
import { VibratoBracketTests } from './vibratobracket_tests';
import { AnnotationTests } from './annotation_tests';
import { ChordSymbolTests } from './chordsymbol_tests';
import { TuningTests } from './tuning_tests';
import { MusicTests } from './music_tests';
import { KeyManagerTests } from './keymanager_tests';
import { ArticulationTests } from './articulation_tests';
import { StaveConnectorTests } from './staveconnector_tests';
import { MultiMeasureRestTests } from './multimeasurerest_tests';
import { PercussionTests } from './percussion_tests';
import { NoteSubGroupTests } from './notesubgroup_tests';
import { ClefKeySignatureTests } from './key_clef_tests';
import { StaveHairpinTests } from './stavehairpin_tests';
import { RhythmTests } from './rhythm_tests';
import { TupletTests } from './tuplet_tests';
import { BoundingBoxTests } from './boundingbox_tests';
import { StrokesTests } from './strokes_tests';
import { StringNumberTests } from './stringnumber_tests';
import { RestsTests } from './rests_tests';
import { ThreeVoicesTests } from './threevoice_tests';
import { CurveTests } from './curve_tests';
import { TextNoteTests } from './textnote_tests';
import { StaveLineTests } from './staveline_tests';
import { OrnamentTests } from './ornament_tests';
import { PedalMarkingTests } from './pedalmarking_tests';
import { TextBracketTests } from './textbracket_tests';
import { StaveModifierTests } from './stavemodifier_tests';
import { GhostNoteTests } from './ghostnote_tests';
import { StyleTests } from './style_tests';
import { FactoryTests } from './factory_tests';
import { ParserTests } from './parser_tests';
import { EasyScoreTests } from './easyscore_tests';
import { RegistryTests } from './registry_tests';
import { BachDemoTests } from './bach_tests';
import { GlyphNoteTests } from './glyphnote_tests';

VexFlowTests.run = function () {
  /*
  AccidentalTests.Start();
  StaveNoteTests.Start();
  VoiceTests.Start();
  NoteHeadTests.Start();
  TabNoteTests.Start();
  TickContextTests.Start();
  ModifierContextTests.Start();
  DotTests.Start();
  BendTests.Start();
  FormatterTests.Start();
  FractionTests.Start();
  ClefTests.Start();
  KeySignatureTests.Start();
  */
  // TimeSignatureTests.Start();
  // StaveTieTests.Start();
  // TabTieTests.Start();
  // StaveTests.Start();
  // TabStaveTests.Start();
  // TabSlideTests.Start();
  // BeamTests.Start();
  // BarlineTests.Start();
  // AutoBeamFormattingTests.Start();
  // GraceNoteTests.Start();
  // GraceTabNoteTests.Start();
  // VibratoTests.Start();
  // VibratoBracketTests.Start();
  // AnnotationTests.Start();
  /*
  ChordSymbolTests.Start();
  TuningTests.Start();
  MusicTests.Start();
  KeyManagerTests.Start();
  */
  ArticulationTests.Start();
  // StaveConnectorTests.Start();
  // MultiMeasureRestTests.Start();
  // PercussionTests.Start();
  // NoteSubGroupTests.Start();
  /*
  ClefKeySignatureTests.Start();
  StaveHairpinTests.Start();
  RhythmTests.Start();
  TupletTests.Start();
  BoundingBoxTests.Start();
  StrokesTests.Start();
  StringNumberTests.Start();
  RestsTests.Start();
  ThreeVoicesTests.Start();
  CurveTests.Start();
  TextNoteTests.Start();
  StaveLineTests.Start();
  OrnamentTests.Start();
  PedalMarkingTests.Start();
  TextBracketTests.Start();
  StaveModifierTests.Start();
  GhostNoteTests.Start();
  StyleTests.Start();
  FactoryTests.Start();
  ParserTests.Start();
  EasyScoreTests.Start();
  RegistryTests.Start();
  BachDemoTests.Start();
  GlyphNoteTests.Start();
  */
};

export default Vex;
