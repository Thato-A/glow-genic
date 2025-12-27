import { image } from "framer-motion/client";
import BarrierCream from "../assets/products/barrier-repair-cream.jpg";
import BHAtoner from "../assets/products/bha-toner.jpg";
import CalmingToner from "../assets/products/calming-toner.jpg";
import CentellaSerum from "../assets/products/centella-serum.jpg";
import CeramideSerum from "../assets/products/ceramide-serum.jpg";
import EnzymeCleanser from "../assets/products/enzyme-cleanser.jpg";
import GelCleanser from "../assets/products/gel-foam-cleanser.jpg";
import GelMoisturizer from "../assets/products/gel-moisturizer.jpg";
import GentleCleanser from "../assets/products/gentle-foam-cleanser.jpg";
import GlycolicToner from "../assets/products/glycolic-toner.jpg";
import HyaluronicToner from "../assets/products/hyaluronic-toner.jpg";
import HydratingCleanser from "../assets/products/hydrating-cream-cleanser.jpg";
import IlluminatingMoist from "../assets/products/illuminating-moisturizer.jpg";
import MattifingCream from "../assets/products/matt-gel-cream.jpg";
import MicellarWater from "../assets/products/mcleansing-water.jpg";
import NiaZincSerum from "../assets/products/nia-zinc-serum.jpg";
import NiacinamideSerum from "../assets/products/niacinamide-serum.jpg";
import PeptideMoist from "../assets/products/peptide-moisturizer.jpg";
import RetinolSerum from "../assets/products/retinol-serum.jpg";
import RichMoistCream from "../assets/products/rich-moisturizing-cream.jpg";
import SalicylicCleanser from "../assets/products/salicylic-acid-cleanser.jpg";
import VitaminCserum from "../assets/products/vc-serum.jpg";
import VitaminCtoner from "../assets/products/vc-toner.jpg";
import WitchHazelToner from "../assets/products/witch-hazel-toner.jpg";

export const routines = {
  acne: {
    name: "Clear Skin Routine",
    description:
      "Target blemishes and prevent breakouts with this clarifying routine",
    products: [
      {
        id: "acne-cleanser-1",
        name: "Salicylic Acid Cleanser",
        step: "Step 1: Cleanse",
        benefit: "Unclogs pores",
        price: 18.99,
        image: SalicylicCleanser,
      },
      {
        id: "acne-toner-1",
        name: "BHA Toner",
        step: "Step 2: Tone",
        benefit: "Exfoliates & reduces inflammation",
        price: 11.99,
        image: BHAtoner,
      },
      {
        id: "acne-serum-1",
        name: "Niacinamide Serum",
        step: "Step 3: Treat",
        benefit: "Controls oil & minimizes pores",
        price: 39.99,
        image: NiacinamideSerum,
      },
      {
        id: "acne-moisturizer-1",
        name: "Lightweight Gel Moisturizer",
        step: "Step 4: Hydrate",
        benefit: "Oil-free hydration",
        price: 28.99,
        image: GelMoisturizer,
      },
    ],
  },
  dryness: {
    name: "Hydration Boost Routine",
    description: "Restore moisture and strengthen your skin barrier",
    products: [
      {
        id: "hydra-cleanser-1",
        name: "Creamy Hydrating Cleanser",
        step: "Step 1: Cleanse",
        benefit: "Gentle & nourishing",
        price: 18.99,
        image: HydratingCleanser,
      },
      {
        id: "hydra-toner-1",
        name: "Hyaluronic Acid Toner",
        step: "Step 2: Tone",
        benefit: "Plumps & hydrates",
        price: 11.99,
        image: HyaluronicToner,
      },
      {
        id: "hydra-serum-1",
        name: "Ceramide Serum",
        step: "Step 3: Treat",
        benefit: "Repairs skin barrier",
        price: 39.99,
        image: CeramideSerum,
      },
      {
        id: "hydra-moisturizer-1",
        name: "Rich Moisturizing Cream",
        step: "Step 4: Hydrate",
        benefit: "Locks in moisture",
        price: 28.99,
        image: RichMoistCream,
      },
    ],
  },
  aging: {
    name: "Youth Renewal Routine",
    description: "Reduce fine lines and boost collagen for youthful skin",
    products: [
      {
        id: "ageing-cleanser-1",
        name: "Gentle Foaming Cleanser",
        step: "Step 1: Cleanse",
        benefit: "Prepares skin",
        price: 18.99,
        image: GentleCleanser,
      },
      {
        id: "ageing-toner-1",
        name: "Vitamin C Toner",
        step: "Step 2: Tone",
        benefit: "Brightens & protects",
        price: 11.99,
        image: VitaminCtoner,
      },
      {
        id: "ageing-serum-1",
        name: "Retinol Serum",
        step: "Step 3: Treat",
        benefit: "Smooths fine lines",
        price: 39.99,
        image: RetinolSerum,
      },
      {
        id: "ageing-moisturizer-1",
        name: "Peptide Moisturizer",
        step: "Step 4: Hydrate",
        benefit: "Firms & plumps",
        price: 28.99,
        image: PeptideMoist,
      },
    ],
  },
  dullness: {
    name: "Radiance Revival Routine",
    description: "Brighten and illuminate for a glowing complexion",
    products: [
      {
        id: "dull-cleanser-1",
        name: "Enzyme Cleanser",
        step: "Step 1: Cleanse",
        benefit: "Gently exfoliates",
        price: 18.99,
        image: EnzymeCleanser,
      },
      {
        id: "dull-toner-1",
        name: "Glycolic Acid Toner",
        step: "Step 2: Tone",
        benefit: "Renews skin surface",
        price: 11.99,
        image: GlycolicToner,
      },
      {
        id: "dull-serum-1",
        name: "Vitamin C Serum",
        step: "Step 3: Treat",
        benefit: "Brightens dark spots",
        price: 39.99,
        image: VitaminCserum,
      },
      {
        id: "dull-moisturizer-1",
        name: "Illuminating Moisturizer",
        step: "Step 4: Hydrate",
        benefit: "Enhances glow",
        price: 28.99,
        image: IlluminatingMoist,
      },
    ],
  },
  sensitivity: {
    name: "Soothing Care Routine",
    description: "Calm irritation and strengthen sensitive skin",
    products: [
      {
        id: "sens-cleanser-1",
        name: "Micellar Cleansing Water",
        step: "Step 1: Cleanse",
        benefit: "Ultra gentle",
        price: 18.99,
        image: MicellarWater,
      },
      {
        id: "sens-toner-1",
        name: "Calming Toner",
        step: "Step 2: Tone",
        benefit: "Reduces redness",
        price: 11.99,
        image: CalmingToner,
      },
      {
        id: "sens-serum-1",
        name: "Centella Serum",
        step: "Step 3: Treat",
        benefit: "Soothes & repairs",
        price: 39.99,
        image: CentellaSerum,
      },
      {
        id: "sens-moisturizer-1",
        name: "Barrier Repair Cream",
        step: "Step 4: Hydrate",
        benefit: "Protects & comforts",
        price: 28.99,
        image: BarrierCream,
      },
    ],
  },
  oily: {
    name: "Balance & Refine Routine",
    description: "Control oil and minimize pores for balanced skin",
    products: [
      {
        id: "oily-cleanser-1",
        name: "Gel Foaming Cleanser",
        step: "Step 1: Cleanse",
        benefit: "Deep cleans pores",
        price: 18.99,
        image: GelCleanser,
      },
      {
        id: "oily-toner-1",
        name: "Witch Hazel Toner",
        step: "Step 2: Tone",
        benefit: "Tightens pores",
        price: 11.99,
        image: WitchHazelToner,
      },
      {
        id: "oily-serum-1",
        name: "Niacinamide + Zinc Serum",
        step: "Step 3: Treat",
        benefit: "Regulates sebum",
        price: 39.99,
        image: NiaZincSerum,
      },
      {
        id: "oily-moisturizer-1",
        name: "Mattifying Gel Cream",
        step: "Step 4: Hydrate",
        benefit: "Oil-free finish",
        price: 28.99,
        image: MattifingCream,
      },
    ],
  },
};
