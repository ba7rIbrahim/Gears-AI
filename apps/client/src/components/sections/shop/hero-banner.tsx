export const HeroBanner = () => {
  return (
    <section
      className="relative w-full min-h-[500px] lg:min-h-[700px] flex flex-col overflow-hidden"
      dir="rtl"
    >
      <div className="flex relative flex-1 justify-center items-center mt-4 w-full h-full">
        <div className="absolute inset-0 z-0 w-full h-full">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/modern-engine-bay-L6x3fiMyPof2GN2LChlIF3yWE1V63h.png"
            alt="خلفية قطع غيار السيارات المتميزة"
            className="object-cover object-center w-full h-full rounded-2xl dark:rounded-t-2xl!"
          />
          <div className="absolute inset-0 bg-black/70 dark:hidden rounded-2xl dark:rounded-t-2xl!" />

          <div className="hidden absolute inset-0 dark:block bg-background/60 rounded-2xl dark:rounded-t-2xl!" />
          <div className="hidden absolute inset-0 bg-gradient-to-r dark:block from-background/90 via-background/60 to-background/90 rounded-2xl dark:rounded-t-2xl!" />
        </div>

        <div className="container relative z-10 px-4 mx-auto text-center sm:px-6 lg:px-8">
          <div className="mx-auto space-y-6 max-w-4xl lg:space-y-8">
            <h1 className="text-4xl font-bold tracking-tight leading-tight text-secondary dark:text-primary sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="block">طور قيادتك</span>
              <span className="block bg-clip-text bg-gradient-to-r text-ring from-primary via-primary/80 to-primary">
                قطع غيار متميزة
              </span>
              <span className="block text-secondary dark:text-primary mt-2 text-2xl font-semibold sm:text-3xl lg:text-4xl xl:text-5xl">
                لكل سيارة
              </span>
            </h1>

            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed sm:text-xl lg:text-2xl text-ring">
              تسوق إطارات وبطاريات وزيوت وإكسسوارات عالية الجودة بأسعار لا
              تُقاوم وشحن سريع.
            </p>

            <div className="pt-8 lg:pt-12">
              <div className="flex flex-wrap gap-6 justify-center items-center text-sm font-medium lg:gap-8 text-muted-foreground">
                <div className="flex gap-2 items-center text-secondary dark:text-primary">
                  <svg
                    className="w-5 h-5 text-secondary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>شحن مجاني للطلبات فوق 99$</span>
                </div>
                <div className="flex gap-2 items-center text-secondary dark:text-primary">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>ضمان مدى الحياة</span>
                </div>
                <div className="flex gap-2 items-center text-secondary dark:text-primary">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>تقييم العملاء 4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden absolute bottom-0 left-0 z-10 w-full h-24 bg-gradient-to-t to-transparent dark:block from-background" />
      </div>
    </section>
  );
};
