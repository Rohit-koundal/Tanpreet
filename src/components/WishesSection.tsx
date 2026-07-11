import { motion } from "framer-motion";

type WishesSectionProps = {
  wishes: readonly string[];
};

export function WishesSection({ wishes }: WishesSectionProps) {
  return (
    <section id="wishes" className="section">
      <div className="container">
        <div className="section-heading centered">
          <p className="eyebrow">My Wishes for You</p>
          <h2>Gentle wishes for every chapter ahead</h2>
        </div>

        <div className="wishes-grid">
          {wishes.map((wish, index) => (
            <motion.div
              key={wish}
              className="wish-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
            >
              {wish}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
