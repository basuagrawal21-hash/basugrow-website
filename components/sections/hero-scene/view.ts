/**
 * How the canvas relates to the spec's camera frame. The frame is `fullWidth`
 * by `fullHeight` CSS px with the phone centred in it; the canvas may start
 * `offsetY` px above it (negative) to leave room for arriving cards.
 */
export type SceneView = { fullWidth: number; fullHeight: number; offsetY: number };
