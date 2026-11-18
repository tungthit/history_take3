import { ART as BASE } from './sciart.jsx';
import { ART_MATH, ART_PHYS0 } from './artmath.jsx';
import { ART_PHYS } from './artphys.jsx';
import { ART_BIO } from './artbio.jsx';
import { ART_MED } from './artmed.jsx';
// every illustration, keyed by milestone id
export const ART = { ...BASE, ...ART_MATH, ...ART_PHYS0, ...ART_PHYS, ...ART_BIO, ...ART_MED };
