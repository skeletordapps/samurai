"use client";
import Image from "next/legacy/image";
import Link from "next/link";

import { Inter } from "next/font/google";
import SSButton from "@/app/components/ssButton";
import TopLayout from "@/app/components/topLayout";
import { StateContext } from "@/app/context/StateContext";
import Projects from "@/app/components/projects";
import ProjectsV2 from "./components/projectsV2";
import ProjectsHome from "./components/projectsHome";
import IncomingProjects from "./components/incomingProjects";

const inter = Inter({
  subsets: ["latin"],
});

const latestupdates = [
  {
    title: "Welcome to Samurai Ventures",
    description: "Your gateway to incredible early-round token offerings",
    href: "https://medium.com/samurai-starter/welcome-to-samurai-ventures-05d97fb63afd",
    image: "/ventures-article.png",
  },
  {
    title: "Samurai Starter — $SAM Token Guide",
    description:
      "The fuel that powers the Samurai Starter ecosystem is prepping for launch",
    href: "https://medium.com/samurai-starter/samurai-starter-sam-token-guide-ae9c183de28c",
    image: "/token-guide.png",
  },
  {
    title: "The Evolution of Single-token Staking",
    description:
      "Introducing a revolutionary FIRST in token staking with veAERO rewards",
    href: "https://medium.com/samurai-starter/samurai-starter-the-evolution-of-single-token-staking-74eff216c949",
    image: "/sam-staking-veaero.png",
  },
];

const edge = [
  {
    title: "High Quality Projects",
    description:
      "Our partner projects are vetted with the highest standard due diligence practices backed by some of the leading verification services in the Web3 industry.",
    image: "/samurai-edge/quality.svg",
  },
  {
    title: "Cashback Rewards",
    description:
      "Samurai Starter is the very first launchpad to offer cashback loyalty rewards for participating in token offerings on our platform. The more you participate, the more you earn via our $SAM token.",
    image: "/samurai-edge/cashback.svg",
  },
  {
    title: "Interact and Earn",
    description:
      "Participate in entertaining games and contests on the Samurai Starter platform and interact with our partners' platforms to earn their native token rewards and even more $SAM.",
    image: "/samurai-edge/interact.svg",
  },
  {
    title: "Equal Investment Opportunities For All",
    description:
      "No more launchpad tiers! Every SamNFT holder has equal opportunity to participate in crowdfunding rounds with max allocation regardless of whale status.",
    image: "/samurai-edge/equality.svg",
  },

  {
    title: "DeFi Yield Farming Mechanisms",
    description:
      "Use your earned $SAM rewards to provide SAM-ETH liquidity on Aerodrome Finance and enjoy incredible ve(3,3) powered yield farming opportunities.",
    image: "/samurai-edge/yield.svg",
  },

  {
    title: "Secure Investments",
    description:
      "Our Samurai investor confidence insurance policy finds a happy medium between the needs of our community and the wants of our partner projects. Feel confident that your investment meets basic launch requirements or get your money back.",
    image: "/samurai-edge/secure.svg",
  },
];

export default function Home() {
  return (
    <>
      <TopLayout background="bg-samurai-cyborg" padding={false}>
        <>
          <div className="px-6 lg:px-8 xl:px-14 relative pt-10 lg:pt-16">
            <div className="relative md:mr-12 xl:max-w-[900px] pb-10">
              <h1 className="text-[48px] sm:text-[58px] lg:text-[90px] font-black leading-[58px] sm:leading-[68px] lg:leading-[98px] text-white">
                Invest. Interact. Earn.
              </h1>
              <p
                className={`leading-normal lg:leading-relaxed pt-6 lg:text-2xl xl:max-w-[900px]  ${inter.className}`}
              >
                Samurai Starter is a leading early-stage crowdfunding platform
                that incentivizes community members to invest and participate in
                the most innovative projects in the crypto space.
              </p>
              <div className="flex flex-col md:flex-row gap-2 md:gap-5 text-samurai-red text-5xl lg:text-4xl mt-12">
                <SSButton isLink href="/launchpad" flexSize>
                  Launchpad
                </SSButton>
                <SSButton isLink href="/ventures" flexSize>
                  Ventures
                </SSButton>
                <SSButton isLink href="/sanka" flexSize>
                  Sanka
                </SSButton>
                <SSButton isLink href="/incubation" flexSize>
                  For Projects
                </SSButton>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full py-14 md:py-12 bg-black/40 relative">
            <div className="flex flex-col px-6 lg:px-8 xl:px-14 text-white">
              <div className="flex flex-col text-white text-2xl">
                <p className="font-bold text-4xl pb-2 opacity-[0.8]">
                  Latest <span className="text-samurai-red">Updates</span>
                </p>

                <div className="grid lg:grid-cols-3 pt-4 gap-9 flex-wrap ">
                  {latestupdates.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      target="_blank"
                      className="rounded-lg bg-black border-[0.5px] border-samurai-red shadow-lg hover:shadow-2xl hover:shadow-samurai-red shadow-samurai-red/20 transition-all hover:scale-[1.03]"
                    >
                      <div className="w-full min-h-[220px] rounded-b-lg  text-white">
                        <div className="w-full h-[200px] relative">
                          <Image
                            src={item.image}
                            placeholder="blur"
                            blurDataURL={item.image}
                            layout="fill"
                            objectFit="cover"
                            alt=""
                            className="rounded-t-lg"
                          />
                        </div>
                        <div className="py-6 px-4">
                          <h3 className="text-xl font-semibold tracking-wide text-white">
                            {item.title}
                          </h3>
                          <p
                            className={`text-sm font-light ${inter.className}`}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="https://medium.com/samurai-starter"
              target="_blank"
              className={`absolute right-6 bottom-4 md:right-20 flex justify-end items-center self-end w-max mt-8 text-md text-white hover:text-samurai-red font-light ${inter.className}`}
            >
              More +
            </Link>
          </div>
        </>
      </TopLayout>

      {/* LATEST UPDATES */}
      {/* <div className="flex flex-col pt-20 pb-10 w-full px-6 lg:px-8 xl:px-14 bg-neutral-900/50 border-t border-samurai-red/50 border-dotted">
        <h2 className="text-6xl font-bold">
          Latest <span className="text-samurai-red">Updates</span>
        </h2>
        <div className="grid lg:grid-cols-3 gap-9 flex-wrap mt-16">
          {latestupdates.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              target="_blank"
              className="rounded-2xl bg-black border-2 border-samurai-red shadow-lg hover:shadow-2xl hover:shadow-samurai-red shadow-samurai-red/20 transition-all hover:scale-[1.03]"
            >
              <div className="w-full min-h-[220px] rounded-b-2xl  text-white">
                <div className="w-full h-[200px] relative">
                  <Image
                    src={item.image}
                    placeholder="blur"
                    blurDataURL={item.image}
                    fill
                    objectFit="cover"
                    alt=""
                    className="rounded-t-2xl"
                  />
                </div>
                <div className="py-6 px-4">
                  <h3 className="text-xl font-semibold tracking-wide text-white">
                    {item.title}
                  </h3>
                  <p className={`text-sm font-light ${inter.className}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="https://medium.com/samurai-starter"
          target="_blank"
          className={`flex justify-end items-center self-end w-max mt-8 text-lg text-white hover:text-samurai-red font-light ${inter.className}`}
        >
          More +
        </Link>
      </div> */}

      {/* INCOMING PROJECTS */}
      <div className="flex flex-col pt-20 pb-14 w-full bg-white/10 px-6 lg:px-8 xl:px-20 text-white border-t-[0.5px] border-samurai-red relative">
        <h2 className="text-4xl md:text-6xl font-bold">
          Incoming <span className="text-samurai-red">Projects</span>
        </h2>
        <IncomingProjects />
      </div>

      {/* FEATURED PROJECTS */}
      <div className="flex flex-col pt-20 pb-14 w-full bg-white/10 px-6 lg:px-8 xl:px-14 text-white border-t-[0.5px] border-samurai-red relative">
        <h2 className="text-4xl md:text-6xl font-bold">
          Featured <span className="text-samurai-red">Projects</span>
        </h2>
        <div className={`text-lg mt-2 inline-flex ${inter.className}`}>
          Learn how to participate{" "}
          <Link
            href="/launchpad"
            className="text-samurai-red text-3xl ml-3 mt-[-7px] transition-all hover:scale-125"
          >
            →
          </Link>
        </div>
        <ProjectsHome max={4} />
        <Link
          href="/launchpad"
          className={`absolute right-6 bottom-5 md:right-20 flex justify-end items-center self-end w-max mt-8 text-md text-white hover:text-samurai-red font-light ${inter.className}`}
        >
          More +
        </Link>
      </div>

      {/* SAMURAI SANKA */}
      <div
        id="sanka"
        className="flex justify-between pt-20 bg-[#F91100] pb-20 w-full px-6 lg:px-8 xl:px-14 bg-samurai-sanka bg-[right_-10rem_top_-20rem] border-t-[0.5px] border-samurai-red"
      >
        <div className="flex flex-col">
          <h2 className="text-4xl md:text-6xl font-bold">
            Samurai <span className="text-samurai-red">Sanka</span>
            <p
              className={`font-light text-2xl md:text-[32px]  text-white mt-2 ${inter.className}`}
            >
              Community interaction platform.
            </p>
          </h2>
          <div
            className={`text-[20px] mt-5 inline-flex max-w-[800px] ${inter.className}`}
          >
            Begin your Web3 journey with Samurai Sanka! Join thousands of people
            who are participating in fun, interactive games and contests and
            earn rewards for participating on our partners' platforms.
          </div>

          <div className="mt-10 w-max">
            <SSButton isLink href="/sanka">
              Check it Out
            </SSButton>
          </div>

          {/* <Link
            href="https://medium.com/samurai-starter"
            target="_blank"
            className="flex justify-center items-center font-black gap-5 text-white p-8 rounded-xl bg-black transition-all hover:scale-105 hover:opacity-90 w-full lg:max-w-[830px] xl:max-w-[700px] mt-10 border shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-rocket-takeoff w-8 lg:w-[46px] h-8 lg:h-[46px]"
              viewBox="0 0 16 16"
            >
              <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362.798-.799.96-1.932.362-2.531-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532Z" />
              <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9.42 9.42 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a9.556 9.556 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093.067.017.12.033.16.045.184.06.279.13.351.295l.029.073a3.475 3.475 0 0 1 .157.721c.055.485.051 1.178-.159 2.065Zm-4.828 7.475.04-.04-.107 1.081a1.536 1.536 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a8.548 8.548 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006ZM5.205 5c-.625.626-.94 1.351-1.004 2.09a8.497 8.497 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107-.04.039Zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a2.835 2.835 0 0 0-.045-.283 3.078 3.078 0 0 0-.3-.041Z" />
              <path d="M7.009 12.139a7.632 7.632 0 0 1-1.804-1.352A7.568 7.568 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z" />
            </svg>

            <span className="text-xl lg:text-4xl">Partner Quests</span>
          </Link>

          <div className="flex flex-row gap-7 flex-wrap mt-6">
            <Link
              href="https://medium.com/samurai-starter"
              target="_blank"
              className="flex justify-center items-center font-black gap-5 text-white p-8 rounded-xl bg-black border border-white transition-all hover:scale-105 hover:opacity-90 shadow-xl w-full lg:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-sliders2-vertical w-8 lg:w-[46px] xl:w-[36px] h-8 lg:h-[46px] xl:h-[36px]"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M0 10.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1H3V1.5a.5.5 0 0 0-1 0V10H.5a.5.5 0 0 0-.5.5ZM2.5 12a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5Zm3-6.5A.5.5 0 0 0 6 6h1.5v8.5a.5.5 0 0 0 1 0V6H10a.5.5 0 0 0 0-1H6a.5.5 0 0 0-.5.5ZM8 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2A.5.5 0 0 0 8 1Zm3 9.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1H14V1.5a.5.5 0 0 0-1 0V10h-1.5a.5.5 0 0 0-.5.5Zm2.5 1.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5Z"
                />
              </svg>

              <span className="text-lg lg:text-3xl xl:text-2xl">
                $SAM Prediction Markets
              </span>
            </Link>
            <Link
              href="https://medium.com/samurai-starter"
              target="_blank"
              className="flex justify-center items-center font-black gap-5 text-white p-8 rounded-xl bg-black border border-white transition-all hover:scale-105 hover:opacity-90  shadow-xl  w-full lg:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-x-diamond w-8 lg:w-[46px] xl:w-[36px] h-8 lg:h-[46px] xl:h-[36px]"
                viewBox="0 0 16 16"
              >
                <path d="M7.987 16a1.526 1.526 0 0 1-1.07-.448L.45 9.082a1.531 1.531 0 0 1 0-2.165L6.917.45a1.531 1.531 0 0 1 2.166 0l6.469 6.468A1.526 1.526 0 0 1 16 8.013a1.526 1.526 0 0 1-.448 1.07l-6.47 6.469A1.526 1.526 0 0 1 7.988 16zM7.639 1.17 4.766 4.044 8 7.278l3.234-3.234L8.361 1.17a.51.51 0 0 0-.722 0zM8.722 8l3.234 3.234 2.873-2.873c.2-.2.2-.523 0-.722l-2.873-2.873L8.722 8zM8 8.722l-3.234 3.234 2.873 2.873c.2.2.523.2.722 0l2.873-2.873L8 8.722zM7.278 8 4.044 4.766 1.17 7.639a.511.511 0 0 0 0 .722l2.874 2.873L7.278 8z" />
              </svg>

              <span className="text-xl lg:text-3xl xl:text-2xl">
                $SAM Lottery
              </span>
            </Link>
          </div> */}
        </div>
        <Image
          src="/samurai-sanka-icon.svg"
          alt="tokens"
          width={350}
          height={350}
          className="hidden xl:block"
        />
      </div>

      {/* SAMURAI EDGE */}
      <div className="flex flex-col pt-10 md:pt-20 pb-10 w-full bg-white/20 border-t-[1px] border-yellow-300/40">
        <div className="flex flex-col px-6 lg:px-8 xl:px-14 text-white">
          <h2 className="text-4xl md:text-6xl font-bold">
            The Samurai <span className="text-samurai-red">Edge</span>
          </h2>
          <div
            className={`grid lg:grid-cols-3 gap-10 leading-normal pt-10 xl:pt-16 text-xl ${inter.className}`}
          >
            {edge.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col gap-2 text-center bg-black/40 text-white border-[1px] border-samurai-red"
                }  border border-black p-8 rounded-lg shadow-lg transition-all hover:scale-105`}
              >
                <div className="flex justify-center pb-10">
                  <Image
                    src={item.image}
                    width={200}
                    height={200}
                    alt={item.title}
                  />
                </div>
                <span
                  className={`font-bold text-2xl border-b-[0.5px] border-neutral-400 pb-3 mb-2`}
                >
                  {item.title}
                </span>
                <p className={`text-[16px] text-neutral-400`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
