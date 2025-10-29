import { pb, Product } from '@/lib/pocketbase';
import { ProductCard } from '@/components/ProductCard';
import { Navbar } from '@/components/Navbar';

// Получение товаров на сервере
async function getProducts(): Promise<Product[]> {
  try {
    const records = await pb.collection('products').getFullList<Product>({
      sort: '-created',
      expand: 'collection_id,type_id,color_id',
    });
    
    return records;
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <Navbar />

      <main className="container">
        {products.length === 0 ? (
          <div className="empty-state">
            <h2>Товары не найдены</h2>
            <p>Добавьте товары через админ-панель Pocketbase</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// Отключаем кеширование для динамического контента
export const dynamic = 'force-dynamic';

