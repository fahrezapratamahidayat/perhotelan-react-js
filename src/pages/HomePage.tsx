import Navbar from "../components/navigation/navbar";
import { SparklesCore } from "../components/ui/sparkles";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="relative w-full h-[80vh] flex items-center justify-center bg-[url('/hotel-exterior.jpg')] bg-cover bg-center  flex-col overflow-hidden rounded-md">
        <h1 className="relative z-20 text-3xl font-bold text-center text-white md:text-7xl lg:text-3xl">
          Luxury Hotel
        </h1>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute top-0 inset-x-20 w-3/4 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute top-0 inset-x-60 w-1/4 h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
      {/* <main className="flex-1">
        <section className="pt-12 w-full md:pt-24 lg:pt-32 border-y">
          <div className="px-4 space-y-10 md:px-6 xl:space-y-16">
            <img
              alt="Hero"
              className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover"
              height={500}
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              width={1270}
            />
          </div>
        </section>
        <section className="py-12 w-full md:py-24 lg:py-32">
          <div className="container px-4 space-y-12 md:px-6">
            <div className="flex flex-col justify-center items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 text-sm bg-gray-100 rounded-lg dark:bg-gray-800">
                  Amenities
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Elevate Your Stay
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Indulge in our world-class amenities and services, designed to
                  make your stay truly exceptional.
                </p>
              </div>
            </div>
            <div className="grid gap-8 items-start mx-auto sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Luxury Spa</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Rejuvenate your mind and body with our state-of-the-art spa
                  facilities.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Gourmet Dining</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Savor the finest culinary delights at our award-winning
                  restaurants.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Rooftop Pool</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enjoy breathtaking views while taking a refreshing dip in our
                  infinity pool.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Fitness Center</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Stay active with our state-of-the-art fitness facilities and
                  personal trainers.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Concierge Service</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Our dedicated concierge team is here to assist you with all
                  your needs.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Luxury Suites</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Indulge in our spacious and elegantly appointed suites for the
                  ultimate comfort.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 w-full md:py-24 lg:py-32">
          <div className="container grid gap-4 justify-center items-center px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Rooms Designed for Relaxation
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Retreat to our luxurious rooms and suites, where every detail is
                carefully curated for your comfort and enjoyment.
              </p>
            </div>
            <div className="grid gap-6 items-center py-12 mx-auto max-w-5xl lg:grid-cols-2 lg:gap-12">
              <img
                alt="Room"
                className="object-cover object-center overflow-hidden mx-auto rounded-xl aspect-video sm:w-full lg:order-last"
                height={310}
                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                width={550}
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Deluxe Room</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Spacious and elegantly appointed with premium amenities.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Luxury Suite</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Indulge in our most exclusive accommodations with
                        breathtaking views.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Family Room</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Designed with families in mind, offering ample space and
                        amenities.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 w-full md:py-24 lg:py-32">
          <div className="container grid gap-4 justify-center items-center px-4 md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Our Guests Say
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Hear from our satisfied guests and discover why Acme Hotel is
                the premier choice for your next stay.
              </p>
            </div>
            <div className="grid gap-y-12 gap-x-32 lg:grid-cols-2">
              <article className="grid gap-3">
                <div className="flex gap-4 items-center">
                  <Avatar className="w-11 h-11 border">
                    <AvatarImage alt="@username" src="/placeholder-user.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="grid">
                    <div className="font-semibold">Scott</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Bernard Hill, California
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center text-xs font-semibold">
                  <div className="flex gap-px items-center">
                    <StarIcon className="w-2.5 h-2.5 fill-primary" />
                    <StarIcon className="w-2.5 h-2.5 fill-primary" />
                    <StarIcon className="w-2.5 h-2.5 fill-primary" />
                    <StarIcon className="w-2.5 h-2.5 fill-primary" />
                    <StarIcon className="w-2.5 h-2.5" />
                  </div>
                  ·<span>1 week ago</span>
                </div>
                <div>
                  Acme Hotel was amazing! The views were incredible and the
                  hotel was very clean. We had a great time.
                </div>
              </article>
              <article className="grid gap-3">
                <div className="flex gap-4 items-center">
                  <Avatar className="w-11 h-11 border">
                    <AvatarImage alt="@username" src="/placeholder-user.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="grid">
                    <div className="font-semibold">Julie</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Miami, California
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center text-xs font-semibold">
                  <div className="flex gap-px items-center">
                    <StarIcon className="w-2.5 h-2.5 fill-primary" />
                    <StarIcon className="w-2.5 h-2.5 fill-primary" />
                    <StarIcon className="w-2.5 h-2.5 fill-primary" />
                    <StarIcon className="w-2.5 h-2.5 fill-primary" />
                    <StarIcon className="w-2.5 h-2.5" />
                  </div>
                  ·<span>1 week ago</span>
                </div>
                <div>
                  We had a great time and would definitely stay again! Gorgeous
                  views and a beautiful hotel.
                </div>
              </article>
              <article className="grid gap-3">
                <div className="flex gap-4 items-center">
                  <Avatar className="w-11 h-11 border">
                    <AvatarImage alt="@username" src="/placeholder-user.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="grid">
                    <div className="font-semibold">Nicole</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Nevada, California
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center text-xs font-semibold">
                  <div className="flex gap-px items-center">
                    <StarIcon className="w-2.5 h-2.5 fill-primary" />
                    <StarIcon className="w-2.5 h-2.5 fill-primary" />
                    <StarIcon className="w-2.5 h-2.5 fill-primary" />
                    <StarIcon className="w-2.5 h-2.5 fill-primary" />
                    <StarIcon className="w-2.5 h-2.5" />
                  </div>
                  ·<span>1 week ago</span>
                </div>
                <div>
                  This is my second time staying at Acme Hotel and it was just
                  as amazing as the first time. I would definitely stay again!
                </div>
              </article>
              <article className="grid gap-3">
                <div className="flex gap-4 items-center">
                  <Avatar className="w-11 h-11 border">
                    <AvatarImage alt="@username" src="/placeholder-user.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="grid">
                    <div className="font-semibold">Miranda</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Citrus Height, California
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center text-xs font-semibold">
                  <div className="flex gap-px items-center">
                    <StarIcon className="w-2.5 h-2.5 fill-primary" />
                    <StarIcon className="w-2.5 h-2.5 fill-primary" />
                    <StarIcon className="w-2.5 h-2.5 fill-primary" />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main> */}
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
