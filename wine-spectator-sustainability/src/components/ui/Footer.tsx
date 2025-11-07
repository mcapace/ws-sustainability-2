'use client';

import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="border-t border-[#DDE5DC] bg-[#F7FAF7] py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#356447]">
              Wine Spectator
            </p>
            <p className="mt-3 text-balance text-lg text-[#132C24]">
              Sustainability isn’t a sidebar story. It’s the headline. Let us help you tell it with
              data, imagery, and experiences that resonate.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h5 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#356447]">
              Producer quick links
            </h5>
            <ul className="mt-4 space-y-2 text-sm text-[#10301f]">
              <li>
                <a className="hover:text-[#356447]" href="#firetree">
                  Firetree Vineyards (CA)
                </a>
              </li>
              <li>
                <a className="hover:text-[#356447]" href="#gloria-ferrer">
                  Gloria Ferrer (Carneros)
                </a>
              </li>
              <li>
                <a className="hover:text-[#356447]" href="#lallier">
                  Champagne Lallier (Aÿ, FR)
                </a>
              </li>
              <li>
                <a className="hover:text-[#356447]" href="#piccini">
                  Piccini 1882 (Tuscany)
                </a>
              </li>
              <li>
                <a className="hover:text-[#356447]" href="#san-simeon">
                  San Simeon Wines (Central Coast)
                </a>
              </li>
              <li>
                <a className="hover:text-[#356447]" href="#willakenzie">
                  WillaKenzie Estate (Willamette)
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            id="activation"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h5 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#356447]">
              Activate the campaign
            </h5>
            <p className="mt-4 text-sm text-[#10301f]">
              To schedule interviews, request tastings, or build custom sustainability content,
              drop us a note.
            </p>
            <a
              href="mailto:sustainability@winespectator.com"
              className="mt-4 inline-flex rounded-full bg-[#10301f] px-6 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#B8E4B3] transition hover:bg-[#16472f]"
            >
              Contact team
            </a>
          </motion.div>
        </div>

        <div id="media" className="mt-16 grid gap-10 rounded-2xl border border-[#DDE5DC] bg-white p-8 md:grid-cols-2">
          <div>
            <h6 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#356447]">
              Media & trade assets
            </h6>
            <p className="mt-3 text-sm text-[#10301f]">
              Download stills, logos, bottle shots, and sustainability fact sheets ready for
              editorial and trade use.
            </p>
          </div>
          <div className="flex items-center justify-end gap-3">
            <a
              id="download"
              href="mailto:sustainability@winespectator.com?subject=Wine%20Spectator%20Sustainability%20Media%20Kit"
              className="rounded-full border border-[#10301f] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#10301f] transition hover:bg-[#10301f] hover:text-[#B8E4B3]"
            >
              Request media kit
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-[#DDE5DC] pt-6 text-center text-xs uppercase tracking-[0.3em] text-[#6E8A7E]">
          © {new Date().getFullYear()} Wine Spectator. Crafted for sustainability storytelling.
        </div>
      </div>
    </footer>
  );
}