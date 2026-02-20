'use client';

import HeroSection from './sections/HeroSection';
import WhatIsErpSection from './sections/WhatIsErpSection';
import WhyNeedErpSection from './sections/WhyNeedErpSection';
import CustomizedErpSection from './sections/CustomizedErpSection';
import WhyChooseUsSection from './sections/WhyChooseUsSection';
import UseCasesSection from './sections/UseCasesSection';
import DemoSection from './sections/DemoSection';
import CtaFormSection from './sections/CtaFormSection';

export default function ErpPageClient() {
  return (
    <main>
      <HeroSection />
      <WhatIsErpSection />
      <WhyNeedErpSection />
      <CustomizedErpSection />
      <WhyChooseUsSection />
      <UseCasesSection />
      <DemoSection />
      <CtaFormSection />
    </main>
  );
}
