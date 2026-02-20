'use client';

import HeroSection from './sections/HeroSection';
import WhatIsSection from './sections/WhatIsSection';
import WhyNeedSection from './sections/WhyNeedSection';
import MobileAppSection from './sections/MobileAppSection';
import CustomizeSection from './sections/CustomizeSection';
import WhyChooseSection from './sections/WhyChooseSection';
import UseCasesSection from './sections/UseCasesSection';
import DemoSection from './sections/DemoSection';
import CtaFormSection from './sections/CtaFormSection';

export default function CspPageClient() {
  return (
    <main>
      <HeroSection />
      <WhatIsSection />
      <WhyNeedSection />
      <MobileAppSection />
      <CustomizeSection />
      <WhyChooseSection />
      <UseCasesSection />
      <DemoSection />
      <CtaFormSection />
    </main>
  );
}
