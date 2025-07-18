import Image from "next/image";
import { formattedDate } from "@/app/utils/formattedDate";
import { useCallback, useState, useContext, useEffect } from "react";

import {
  GiveawayStatus,
  GiveawayType,
  participate,
  pickWinners,
  setWinners,
  STATUS_COLORS,
  userInfo,
} from "../contracts_integrations/giveways";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  TrophyIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { Giveaway, GIVEAWAYS_LIST, Winner } from "../utils/constants/sanka";

import { Inter } from "next/font/google";
import Loading from "./loading";
import { userInfo as pointsUserInfo } from "../contracts_integrations/points";
import { StateContext } from "../context/StateContext";
import { currentTime } from "../utils/currentTime";
import ConnectButton from "./connectbutton";
import Link from "next/link";
import { discord, twitterX, youtube } from "../utils/svgs";
import SocialModal from "./sanka/modal";
// import { TwitterEngagement } from "../api/twitter/route";
import { set } from "date-fns";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "500", "900"],
});

export default function GiveawayCard({
  owner,
  giveaway,
  setReload,
  type = "dark",
}: {
  owner: string | null;
  giveaway: GiveawayType;
  setReload: Function;
  type?: string;
}) {
  const [ticketsToBuy, setTicketsToBuy] = useState(1);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [giveawayStatus, setGiveawayStatus] = useState(
    GiveawayStatus.UPCOMING.toString()
  );
  const [giveawayStatusColors, setGiveawayStatusColors] = useState<any>(null);
  const [userTickets, setUserTickets] = useState(0);
  const [winner, setWinner] = useState<Winner | null>(null);
  const [open, setOpen] = useState(false);
  // const [twitterData, setTwitterData] = useState<TwitterEngagement | null>(
  //   null
  // );

  const {
    prizes,
    prizeValue,
    ticketsToDraw,
    image,
    background,
    socials,
    winners,
    disclaimer,
  } =
    GIVEAWAYS_LIST.find((item) => item.id === giveaway.id) ||
    GIVEAWAYS_LIST[giveaway.id];

  const { signer, account } = useContext(StateContext);

  enum ChangeType {
    INCREASE,
    DECREASE,
  }

  // const onCheckEngagement = useCallback(
  //   async (username: string) => {
  //     setLoading(true);

  //     // Check if the user is already engaged and saved on storage
  //     const storedEngagement = localStorage.getItem(
  //       `twitter-engagement-${giveaway.id}-${username}-${account}`
  //     );

  //     if (storedEngagement) {
  //       console.log("engagement found");
  //       const engagement = JSON.parse(storedEngagement);
  //       setTwitterData(engagement);
  //       setLoading(false);
  //       if (engagement.engaged) setOpen(false);
  //       return;
  //     }

  //     if (signer) {
  //       console.log("checking engagement");
  //       const response = await fetch(
  //         `/api/twitter?tweetId=1910349054095278415&username=${encodeURIComponent(
  //           username
  //         )}`
  //       );
  //       const data = await response.json();
  //       if (data) {
  //         setTwitterData(data);
  //         setLoading(false);
  //       }
  //       if (data.engaged) {
  //         // Save the engagement on storage
  //         localStorage.setItem(
  //           `twitter-engagement-${giveaway.id}-${username}-${account}`,
  //           JSON.stringify(data)
  //         );
  //         console.log("engagement saved");
  //         setOpen(false);
  //       }
  //     }
  //   },
  //   [account, signer, setOpen, setLoading]
  // );

  const onPickWinners = useCallback(async () => {
    setLoading(true);
    if (signer) {
      await pickWinners(giveaway.id);
    }
    setLoading(false);
  }, [giveaway, signer, setLoading]);

  const onBuyTickets = useCallback(async () => {
    setLoading(true);

    if (signer) {
      await participate(giveaway.id, ticketsToBuy, signer);
      await getUserTickets();
      setReload(true);
    }
    setLoading(false);
  }, [signer, giveaway, ticketsToBuy, setLoading]);

  const onTicketsAmountChange = useCallback(
    (type: ChangeType) => {
      if (type === ChangeType.INCREASE) setTicketsToBuy(ticketsToBuy + 1);
      if (type === ChangeType.DECREASE && ticketsToBuy > 1) {
        setTicketsToBuy(ticketsToBuy - 1);
      }
    },
    [ticketsToBuy, setTicketsToBuy]
  );

  const getStatus = () => {
    const now = currentTime();

    let status: string = GiveawayStatus.UPCOMING;
    if (now >= giveaway.startAt && now < giveaway.endAt)
      status = GiveawayStatus.ACTIVE;
    if (now >= giveaway.endAt && now < giveaway.drawAt)
      status = GiveawayStatus.FINISHED;
    if (now >= giveaway.drawAt && !winners) status = GiveawayStatus.DRAWING;
    if (winners) status = GiveawayStatus.DRAWN;

    const statusColors = STATUS_COLORS.find((item) => item.status === status);

    setGiveawayStatus(status);
    setGiveawayStatusColors(statusColors);
  };

  const checkIsWinner = useCallback(() => {
    if (signer && account && winners) {
      const winner = winners?.find((item) => item.address === account);
      setWinner(winner ? winner : null);
    }
  }, [giveaway, account, setWinner]);

  const getUserBalance = async () => {
    if (signer) {
      const response = await pointsUserInfo(signer);
      setBalance(response?.balance || 0);
    }
  };

  const getUserTickets = async () => {
    if (signer) {
      const response = await userInfo([giveaway.id], signer);
      setUserTickets(response?.participations[0]?.tickets || 0);
    }
  };

  useEffect(() => {
    getUserBalance();
    getUserTickets();
    checkIsWinner();
  }, [signer]);

  useEffect(() => {
    getStatus();
  }, [giveaway]);

  return (
    <div
      className={`flex flex-col rounded-lg border-[0.5px] border-neutral-700 text-start ${
        type === "dark" ? "bg-black/50" : "bg-neutral-700"
      }  w-full py-4 pb-5 shadow-xl px-4 relative`}
    >
      <div className="flex w-full mb-4 relative">
        <div className="flex w-full h-[560px] relative shadow-lg shadow-black/30">
          <Image
            src={background}
            fill
            style={{ objectFit: "cover" }}
            alt={giveaway.name}
          />
        </div>

        <div className="absolute left-0 top-[100px] lg:top-auto lg:bottom-0 flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between bg-black/50 backdrop-blur-sm w-full lg:p-10 py-8 text-white text-xl lg:text-3xl 2xl:text-4xl font-bold lg:border-t border-samurai-red">
          <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-5 w-full">
            <Image
              src={image}
              width={140}
              height={140}
              className="rounded-lg border border-white/30"
              alt={giveaway.name}
            />
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col gap-1 text-center lg:text-start">
                {giveaway.name}
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-yellow-300 w-full text-center lg:text-start">
                    Total of {giveaway.tickets} tickets purchased
                  </span>
                </div>
              </div>
              <div className="flex items-center w-full gap-5 justify-center lg:justify-start flex-wrap ml-1">
                {socials?.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`transition-all hover:opacity-75 text-white ${
                      item.svg === twitterX
                        ? "scale-[1.3] mr-[-7px]"
                        : item.svg === discord
                        ? "scale-[1.8]"
                        : item.svg === youtube
                        ? "scale-[1.9]"
                        : "scale-[1.2]"
                    }`}
                    target="_blank"
                  >
                    {item.svg}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center lg:gap-2 bg-black/30 py-6 lg:ml-12 lg:w-full lg:border lg:border-white/10 lg:rounded-lg lg:shadow-lg lg:shadow-black/30">
            <span className="text-yellow-300 w-max text-xl lg:text-2xl">
              GIVEAWAY PRIZES
            </span>
            <p className="text-white flex flex-col gap-2 items-center">
              <span className="text-xl lg:text-3xl 2xl:text-4xl">
                {prizes}{" "}
              </span>
              <span className="text-xl text-green-300">
                ~{` $${prizeValue.toLocaleString("en-us")}`} USD
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 items-center pb-5 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-2 text-center ">
          <div className="flex flex-col bg-black/50 py-4 px-6 text-sm border border-white/10">
            <span className="text-white/70">TICKET PRICE</span>
            <span className="text-lg">
              {giveaway.priceInPoints.toLocaleString("en-us")} Samurai Points
            </span>
          </div>
          <div className="flex flex-col bg-black/50 py-4 px-6 text-sm border border-white/10">
            <span className="text-white/70">WINNERS</span>
            <span className="text-lg">
              {ticketsToDraw} x ${prizeValue / ticketsToDraw}
            </span>
          </div>
          <div className="flex flex-col bg-black/50 py-4 px-6 text-sm border border-white/10">
            <span className="text-white/70">START DATE</span>
            <span className="text-lg">
              {formattedDate(giveaway.startAt)} UTC
            </span>
          </div>
          <div className="flex flex-col bg-black/50 py-4 px-6 text-sm border border-white/10">
            <span className="text-white/70">END DATE</span>
            <span className="text-lg">{formattedDate(giveaway.endAt)} UTC</span>
          </div>
          <div className="flex flex-col bg-black/50 py-4 px-6 text-sm border border-white/10">
            <span className="text-white/70">DRAW DATE</span>
            <span className="text-lg">
              {formattedDate(giveaway.drawAt)} UTC
            </span>
          </div>
          <div className="flex flex-col bg-black/50 py-4 px-6 text-sm border border-white/10">
            <span className="text-samurai-red">MY TICKETS</span>
            <span className="text-lg">{userTickets}</span>
          </div>
        </div>
        <div className="w-full h-[1px] lg:w-[1px] lg:h-[300px]  bg-white/10" />
        <div className="flex flex-col justify-center items-center w-full">
          {signer && account ? (
            <div className=" flex flex-col justify-center items-center gap-4">
              <p
                className={`text-4xl leading-[24px] lg:leading-[30px] text-center ${inter.className}`}
              >
                Enter the Giveway <br />
                <span className="text-sm lg:text-lg text-white/70">
                  Select amount of tickets to enter the giveaway
                </span>
              </p>

              <div className="text-center mt-2 mb-[-6px] lg:mt-6 text-sm font-mono">
                Balance:{" "}
                {balance.toLocaleString("en-us", { minimumFractionDigits: 2 })}{" "}
                Points
              </div>
              <div className="relative w-max scale-[0.9] sm:scale-100">
                <input
                  disabled
                  type="text"
                  className="text-xl rounded-full text-black/80 font-medium text-center min-w-[380px] max-w-[340px]"
                  placeholder="amount of tickets"
                  value={`${ticketsToBuy} Tickets = ${
                    ticketsToBuy * giveaway.priceInPoints
                  } Points`}
                  onChange={(e) => setTicketsToBuy(Number(e.target.value))}
                />
                <button
                  disabled={loading || giveawayStatus !== GiveawayStatus.ACTIVE}
                  className="absolute top-1 left-2 text-black transition-all opacity-75 hover:enabled:opacity-100"
                  onClick={() => onTicketsAmountChange(ChangeType.DECREASE)}
                >
                  <MinusCircleIcon width={40} />
                </button>
                <button
                  disabled={loading || giveawayStatus !== GiveawayStatus.ACTIVE}
                  className="absolute top-1 right-2 text-black transition-all opacity-75 hover:enabled:opacity-100"
                  onClick={() => onTicketsAmountChange(ChangeType.INCREASE)}
                >
                  <PlusCircleIcon width={40} />
                </button>
              </div>
              <button
                disabled={
                  loading ||
                  giveawayStatus !== GiveawayStatus.ACTIVE ||
                  balance < ticketsToBuy * giveaway.priceInPoints
                }
                onClick={onBuyTickets}
                className="flex items-center justify-center text-sm lg:text-md h-[50px] disabled:bg-white/10 enabled:bg-samurai-red hover:enabled:opacity-75 disabled:text-white/20 disabled:border-white/20 rounded-full min-w-[380px] max-w-[380px]  scale-[0.9] sm:scale-100"
              >
                {loading ? (
                  <Loading />
                ) : giveawayStatus !== GiveawayStatus.ACTIVE ? (
                  giveawayStatus
                ) : (
                  `BUY ${ticketsToBuy} TICKET${ticketsToBuy > 1 ? "S" : ""}`
                )}
              </button>
            </div>
          ) : (
            <div className="max-w-[500px]">
              <ConnectButton />
            </div>
          )}
        </div>
      </div>
      {disclaimer && (
        <span className="text-xs text-white/60">{disclaimer}</span>
      )}
      <div className="flex flex-row justify-between items-start flex-wrap gap-2 absolute top-10 left-0 z-20 w-full px-5 lg:px-10">
        {winners && account ? (
          <>
            {winner ? (
              <div className="flex items-center gap-1 text-yellow-300 relative z-20 mt-[-8px] lg:mt-0">
                <TrophyIcon
                  width={30}
                  className="w-[60px] md:w-[86px] md:bg-black/50 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-xl md:text-3xl font-bold text-yellow-300 z-20 box-shadow-lg">
                    You Won!
                  </span>
                  <span className="text-[16px] text-white mt-[-2px]">
                    {winner?.sortedWins +
                      " winning tickets -> $" +
                      winner?.winAmount.toLocaleString("en-us")}
                  </span>
                  <span className="text-[11px] text-white/70">
                    *Claimable on Galxe after TGE
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-400 relative bg-black md:bg-transparent py-2 lg:py-0 px-2 pr-3 md:px-0 rounded-full shadow-lg md:shadow-transparent z-20">
                <XCircleIcon
                  width={30}
                  className="w-[40px] md:w-[64px] bg-white/20 md:bg-black/50 p-2 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-bold text-red-400 z-20 box-shadow-lg">
                    You didn't win this time...
                  </span>
                  <span className="text-sm text-white/70 mt-[-5px]">
                    The next giveaway is around the corner!
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div />
        )}

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 bg-black py-2 px-4 rounded-full border border-white/30 shadow-lg z-20">
            <span
              className={`bg-gradient-to-tr ${giveawayStatusColors?.from} ${giveawayStatusColors?.to} shadow-lg rounded-full w-4 h-4 animate-pulse`}
            />
            <span className={`${giveawayStatusColors?.text} text-sm`}>
              {giveawayStatus}
            </span>
          </div>
          {/* {owner && owner === account && (
            <button
              disabled={loading}
              onClick={onPickWinners}
              className="flex items-center justify-center text-sm lg:text-md py-2 disabled:bg-white/10 enabled:bg-samurai-red hover:enabled:opacity-75 disabled:text-white/20 disabled:border-white/20 rounded-full scale-[0.9] sm:scale-100"
            >
              {loading ? <Loading /> : "Pick Winners"}
            </button>
          )} */}
        </div>
      </div>
      {/* <SocialModal
        open={!twitterData || !twitterData?.engaged}
        setOpen={() => {}}
        onSubmit={onCheckEngagement}
        twitterEngagement={twitterData || undefined}
      /> */}
    </div>
  );
}
