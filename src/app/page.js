import Navbar from './component/navbar';
import ImageSlider from './component/ImageSlider';
import NewsTicker from './component/NewsTicker';
import NewsGrid from './component/NewsGrid';
import Footer from './component/Footer';
import QuickAccess from './component/QuickAccess';
import WeatherPage from './component/WeatherPage';
import ImageGallery from './component/ImageGallery';
import { fetchData } from "./utils/apiHelper";

export default async function Home() {
  let descriptions = [];

  try {
    const result = await fetchData(`/lastnews`);
    descriptions = result.map(item => item.Title);
  } catch (error) {
    console.error('⚠️ خطأ أثناء جلب الأخبار:', error.message);
    // ممكن ترجع بيانات وهمية أو تتركها فاضية
    descriptions = ["لا توجد أخبار حالياً"];
  }

  return (
    <div>
      <Navbar />
      <ImageSlider />
      <NewsTicker newsItems={descriptions} direction="horizontal" speed={30} />
      <QuickAccess />
      <NewsGrid />
      <WeatherPage />
      <ImageGallery />
      <Footer />
    </div>
  );
}
