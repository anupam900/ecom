import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <div>
      <Hero />
      
      <main>
        <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
            <ProductGrid />
          </motion.div>
        </section>

        <Newsletter />
      </main>
    </div>
  );
}