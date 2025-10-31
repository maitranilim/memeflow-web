import MemeCard from '@/components/MemeCard';
import GenreFilter from '@/components/GenreFilter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadFAB from '@/components/UploadFAB';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b1020]">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <GenreFilter />
        <MemeCard />
      </main>
      
      <Footer />
      <UploadFAB />
    </div>
  );
}
