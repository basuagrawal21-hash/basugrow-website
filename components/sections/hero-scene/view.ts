/**
 * How the canvas relates to the spec's camera frame. The frame is `fullWidth`
 * by `fullHeight` CSS px with the phone centred in it; the canvas may start
 * `offsetY` px above it (negative) to leave room for arriving cards.
 */
export type SceneView = { fullWidth: number; fullHeight: number; offsetY: number };

/**
 * The 3D phone is the flat LeadTicker in depth, so its layout is the flat
 * phone's, measured in CSS px and scaled to world units. Free of three.js so
 * HeroPhone can size the canvas without pulling the scene into the bundle.
 */
export const PX = 2.52 / 320;

export const phone = {
  /** Outer frame, 320 x 411.6 px, radius 36 px (rounded-[2.25rem]). */
  width: 320 * PX,
  height: 411.6 * PX,
  radius: 36 * PX,
  /** Screen inset by padding + border, radius 28 px (rounded-[1.75rem]). */
  screenW: 297,
  screenH: 388.6,
  screenRadius: 28,
  /** Cards: 269 x 84 px on a 94 px step, starting 102.6 px down the screen. */
  cardW: 269,
  cardH: 84,
  cardStep: 94,
  cardsTop: 102.6,
  cardsAreaH: 272,
} as const;

/** Card centre Y in world units for a slot, relative to the phone's centre. */
export const slotY = (slot: number) =>
  (phone.screenH / 2 - (phone.cardsTop + phone.cardH / 2 + slot * phone.cardStep)) * PX;

/** Bottom edge of the cards area, where a leaving card is clipped. */
export const cardsBottomY = (phone.screenH / 2 - (phone.cardsTop + phone.cardsAreaH)) * PX;
