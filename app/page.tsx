import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadFAB from '@/components/UploadFAB';
import MemeExplorer from '@/components/MemeExplorer';
import { getMemes } from '@/lib/memes';

export default async function Home() {
  const memes = await getMemes();

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1020]">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <MemeExplorer memes={memes} />
      </main>

      <Footer />
      <UploadFAB />
    </div>
  );
}
