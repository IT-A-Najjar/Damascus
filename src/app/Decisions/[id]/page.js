import Navbar from '../../component/navbar';
import Footer from '../../component/Footer';
import Baner from '../../component/Baner';
import '../style.css';
import Image from 'next/image';
import img from '../../../images/logo.png';
import Link from 'next/link';
import { fetchData } from '../../utils/apiHelper';

export default async function DecisionPage({ params }) {
  const { id } = params;
  // جلب البيانات على الخادم
  const decisionType = await fetchData(`/decision-types/${id}`);
  const decision = await fetchData(`/decisions/${id}`);
console.log(decision);

  return (
    <div className='page'>
      <Navbar />
      <Baner titel="القرارات" uptitle="القرارات والمراسيم" suptitle={decisionType[0].DecisionType} />
      <main className="container p-6 mx-auto">
        <div className='titel-decisions'>
          <span></span>
          <h2 className="text-3xl font-bold pr-6">{decisionType[0].DecisionType}</h2>
        </div>
        <div className="flex flex-wrap my-4">
          <div className="w-full md:w-1/1 p-4">
            {decision.map((item, index) => (
              <div className='card-decisions-list' key={index}>
                <div className='up-image-decisions-list'>
                  <Image className='image-decisions-list' src={img} alt='decisions' width={150}
                    height={150}
                    quality={100} />
                  <span>{item.id}</span>
                </div>
                <Link href={`/Decisions/${id}/datils/${item.id}`}>
                  <h1 className='font-bold text-2xl'>
                    {item.Title}
                  </h1>
                  <p>
                    {item.Description}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}