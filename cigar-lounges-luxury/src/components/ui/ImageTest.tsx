'use client';

import Image from 'next/image';

export function ImageTest() {
  return (
    <div className="p-8 bg-white">
      <h2 className="text-2xl font-bold mb-4">Image Test</h2>
      
      {/* Test Davidoff Logo */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Davidoff Logo</h3>
        <Image
          src="/images/Davidoff Logo.png"
          alt="Davidoff Logo"
          width={200}
          height={80}
          className="border"
        />
      </div>

      {/* Test Barclay Rex Logo */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Barclay Rex Logo</h3>
        <Image
          src="/images/Barclay Rex logo.png"
          alt="Barclay Rex Logo"
          width={200}
          height={80}
          className="border"
        />
      </div>

      {/* Test Davidoff Madison Hero */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Davidoff Madison Hero</h3>
        <Image
          src="/images/Davidoff Madison/Facade_Davidoff_NYMadison_04a.jpg"
          alt="Davidoff Madison"
          width={400}
          height={300}
          className="border"
        />
      </div>

      {/* Test Davidoff 6th Hero */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Davidoff 6th Hero</h3>
        <Image
          src="/images/Davidoff Sixth Ave/Davidoff_6Av_01_V2_RGB.jpg"
          alt="Davidoff 6th"
          width={400}
          height={300}
          className="border"
        />
      </div>

      {/* Test Barclay Rex Hero */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Barclay Rex Hero</h3>
        <Image
          src="/images/Barclay Rex/EFuerniss_KAMI_BarclayRex_6889 copy 2.jpg"
          alt="Barclay Rex"
          width={400}
          height={300}
          className="border"
        />
      </div>
    </div>
  );
}
