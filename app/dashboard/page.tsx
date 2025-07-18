"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import TopLayout from "@/app/components/topLayout";

import { shortAddress } from "../utils/shortAddress";
import Link from "next/link";
import ChartPointsProgression from "../components/dashboard/chartPointsProgression";
import { useState, useContext, useEffect, useCallback } from "react";
import { IDO_CHAINS } from "../utils/constants";
import SSSelect from "../components/ssSelect";
import ChartPointsUsage from "../components/dashboard/chartPointsUsage.tsx";
import { distribution, network } from "../utils/svgs";
import { CalendarDaysIcon, ChartBarIcon } from "@heroicons/react/20/solid";
import UserList from "../components/dashboard/userList";
import { StateContext } from "../context/StateContext";
import {
  fetchVestingDetails,
  getHistoricalBalances,
  userInfo,
} from "../contracts_integrations/dashboard";
import LoadingBlocker from "../components/loadingBlocker";
import {
  DashboardUserDetails,
  DashboardUserVestingDetails,
} from "../utils/interfaces";
import ConnectButton from "../components/connectbutton";
import { useQuery } from "@tanstack/react-query";

const inter = Inter({
  subsets: ["latin"],
});

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState("Points Progression");
  const [chartInterval, setChartInterval] = useState("Latest Months");
  const [filterChain, setFilterChain] = useState("All Networks");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [userDetails, setUserDetails] = useState<DashboardUserDetails | null>(
    null
  );
  const [userVestingDetails, setUserVestingDetails] =
    useState<DashboardUserVestingDetails | null>(null);

  const [pointsProgressionData, setPointsProgressionData] = useState<any>([]);

  const { signer, account } = useContext(StateContext);

  enum FilterType {
    ChartType,
    ChartInterval,
    FilterChain,
    FilterStatus,
  }

  const { data: userInfoData, isLoading: loadingUser } = useQuery({
    queryKey: ["userInfo", account], // Query key
    queryFn: async () => {
      if (!signer) throw new Error("Signer is not available");
      return userInfo(signer);
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: !!signer, // Only run when signer is available
  });

  const { data: userVestingInfoData, isLoading: loadingUserVesting } = useQuery(
    {
      queryKey: ["userInfoVesting", account], // Query key
      queryFn: async () => {
        if (!signer) throw new Error("Signer is not available");
        return fetchVestingDetails(
          signer,
          // "0xcae8cf1e2119484d6cc3b6efaad2242adbdb1ea8",
          userDetails?.userIdos || []
        );
      },
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      enabled: !!signer && !!userDetails?.userIdos, // Only run when signer && userIdos are available
    }
  );

  const { data: chartInfoData, isLoading: loadingChart } = useQuery({
    queryKey: ["getHistoricalBalances", account], // Query key
    queryFn: async () => {
      if (!signer) throw new Error("Signer is not available");
      return getHistoricalBalances(
        6,
        signer
        // "0xcae8cf1e2119484d6cc3b6efaad2242adbdb1ea8"
      );
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: !!signer, // Only run when signer is available
  });

  const onChangeFilters = useCallback(
    (type: FilterType, value: string) => {
      switch (type) {
        case FilterType.ChartType:
          setChartType(value);
          break;
        case FilterType.ChartInterval:
          setChartInterval(value);
          break;
        case FilterType.FilterChain:
          setFilterChain(value);
          break;
        case FilterType.FilterStatus:
          setFilterStatus(value);
          break;
        default:
          break;
      }
    },
    [setChartType, setChartInterval, setFilterChain, setFilterStatus]
  );

  const resetFilters = useCallback(() => {
    onChangeFilters(FilterType.FilterChain, "All Networks");
    onChangeFilters(FilterType.FilterStatus, "All Status");
  }, [onChangeFilters]);

  useEffect(() => {
    if (userInfoData) setUserDetails(userInfoData);
  }, [userInfoData, setUserDetails]);

  useEffect(() => {
    if (userVestingInfoData) {
      setUserVestingDetails(userVestingInfoData);
    }
  }, [userVestingInfoData, setUserVestingDetails]);

  useEffect(() => {
    if (chartInfoData) setPointsProgressionData(chartInfoData);
  }, [chartInfoData, setPointsProgressionData]);

  return (
    <div className="flex flex-col relative">
      <TopLayout background="bg-samurai-cyborg-fem">
        <div className="flex flex-col px-2 lg:px-8 xl:px-14 ">
          <div className="flex flex-row justify-between items-center max-w-[1130px] mt-10 lg:mt-0">
            {/* TOP CONTENT */}
            <div className="w-full text-center lg:text-start">
              <p className="text-[48px] sm:text-sm lg:text-lg text-white">
                Samurai
              </p>
              <p className="text-samurai-red text-3xl font-black">Dashboard</p>
            </div>
          </div>

          {(!signer || !account) && (
            <div className="flex flex-col my-24 gap-5 lg:w-max self-center justify-center items-center lg:h-[40vh]">
              <span className="text-center lg:text-start lg:text-xl">
                Connect your wallet to check your detailed infos
              </span>
              <ConnectButton />
            </div>
          )}

          {signer && account && (
            <div className="flex flex-col lg:flex-row mt-8 gap-5 ">
              {/* Overview */}
              <div
                className={`flex flex-col lg:flex-row lg:justify-between lg:items-center w-full ${inter.className}`}
              >
                <div className="flex flex-col justify-center bg-black/30 backdrop-blur-md py-8 rounded-3xl w-full lg:min-h-[520px] border border-white/20 shadow-lg shadow-black/40">
                  <div className="flex items-center justify-between w-full flex-wrap gap-5">
                    <div className="flex items-center gap-2 px-8">
                      <Image
                        src="/samurai.svg"
                        alt="avatar"
                        width={42}
                        height={42}
                        className="bg-black/60 rounded-full p-2 border border-white/20"
                      />
                      <div className="flex flex-col text-white">
                        <span className="text-white/70 text-sm">
                          EVM Address
                        </span>
                        <Link
                          href={`https://basescan.org/address/${userDetails?.account}`}
                          className="2xl:text-[1rem] hover:underline hover:opacity-80"
                          target="_blank"
                        >
                          {shortAddress(userDetails?.account || "", 8)}
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 px-10 relative">
                      <div className="flex flex-col xl:flex-row lg:items-center gap-2 xl:gap-5 text-sm">
                        <div className="flex items-center gap-2">
                          <ChartBarIcon width={24} height={24} />
                          <SSSelect
                            options={["Points Progression"]}
                            onChange={(value) =>
                              onChangeFilters(FilterType.ChartType, value)
                            }
                            value={chartType}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDaysIcon width={24} height={24} />
                          <SSSelect
                            options={["Latest Months"]}
                            onChange={(value) =>
                              onChangeFilters(FilterType.ChartInterval, value)
                            }
                            value={chartInterval}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {chartType === "Points Progression" ? (
                    <ChartPointsProgression data={pointsProgressionData} />
                  ) : (
                    <ChartPointsUsage />
                  )}
                  <div className="hidden lg:flex flex-row items-center justify-between mt-10 text-center w-full flex-wrap lg:flex-nowrap">
                    <div className="flex flex-col w-full">
                      <p className="text-white/70 text-sm">Total IDOs</p>
                      <p className="text-white text-3xl 2xl:text-5xl font-bold">
                        {userDetails?.userIdos.length}
                      </p>
                      <p className="text-orange-200 text-lg">Participated</p>
                    </div>
                    {/* EARNED = BALANCE + SPENT */}
                    <div className="flex flex-col w-full">
                      <p className="text-white/70 text-sm">Earned</p>
                      <p className="text-white text-3xl 2xl:text-5xl font-bold">
                        {Number(userDetails?.points || 0 + 0).toLocaleString(
                          "en-us"
                        )}
                      </p>
                      <p className="text-orange-200 text-lg">Samurai Points</p>
                    </div>
                    <div className="flex flex-col w-full">
                      <p className="text-white/70 text-sm">Spent</p>
                      <p className="text-white text-3xl 2xl:text-5xl font-bold">
                        0
                      </p>
                      <p className="text-orange-200 text-lg">Samurai Points</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`hidden lg:flex flex-row lg:flex-col gap-4 flex-wrap lg:flex-nowrap`}
              >
                {/* Tier */}
                <div className="flex flex-col justify-center bg-samurai-red/50 backdrop-blur-md py-5 px-8 rounded-3xl w-max border border-white/20  shadow-lg shadow-black/40">
                  <p className="text-white text-4xl 2xl:text-5xl">
                    {userDetails?.tier}
                  </p>
                  <p className="text-orange-200 text-lg">Tier</p>
                </div>

                {/* Sam */}
                <div className="flex flex-col justify-center bg-neutral-500/50 backdrop-blur-md p-8 rounded-3xl w-max h-full border border-white/20  shadow-lg shadow-black/40">
                  <p className="text-white/70 text-sm">Total Tokens</p>
                  <p className="text-white text-4xl 2xl:text-5xl">
                    {userDetails?.samBalance.toLocaleString("en-us")}
                  </p>
                  <p className="text-orange-200 text-lg">$SAM</p>
                </div>

                {/* Points */}
                <div className="flex flex-col justify-center bg-emerald-300/30 backdrop-blur-md py-5 px-8 rounded-3xl w-max h-full border border-white/20  shadow-lg shadow-black/40">
                  <p className="text-white/70 text-sm">Balance</p>
                  <p className="text-white text-2xl 2xl:text-4xl">
                    {userDetails?.points.toLocaleString("en-us")}
                  </p>
                  <p className="text-orange-200 text-lg">Samurai Points</p>
                </div>

                {/* Sam Nft */}
                <div className="flex flex-col justify-center bg-yellow-300/50 backdrop-blur-md py-5 px-8 rounded-3xl w-max border border-white/20  shadow-lg shadow-black/40">
                  <p className="text-white/70 text-sm">Locked</p>
                  <p className="text-white text-4xl 2xl:text-5xl">
                    {userDetails?.nftBalance}
                  </p>
                  <p className="text-orange-200 text-lg">SAM NFT</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </TopLayout>

      {/* MOBILE */}
      <div
        className={`flex lg:hidden flex-col items-center gap-2 w-full px-2 py-10`}
      >
        <div className="flex items-center justify-center gap-2 w-full">
          <div className="flex flex-col justify-center bg-white/10 backdrop-blur-md h-[140px] p-8 rounded-3xl w-full md:w-[370px] border border-white/20  shadow-lg shadow-black/40">
            <p className="text-white/70 text-xs sm:text-sm">Total IDOs</p>
            <p className="text-white text-xl sm:text-2xl">
              {userDetails?.userIdos.length}
            </p>
            <p className="text-orange-200 text-[1rem] sm:text-lg">
              Participated
            </p>
          </div>

          <div className="flex flex-col justify-center bg-white/5 backdrop-blur-md h-[140px] p-8 rounded-3xl w-full md:w-[370px] border border-white/20  shadow-lg shadow-black/40">
            <p className="text-white/70 text-xs sm:text-sm">Earned</p>
            <p className="text-white text-xl sm:text-2xl">
              {Number(userDetails?.points || 0 + 0).toLocaleString("en-us")}
            </p>
            <p className="text-orange-200 text-[1rem] sm:text-lg">
              Samurai Points
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 w-full">
          <div className="flex flex-col justify-center bg-white/10 backdrop-blur-md h-[140px] p-8 rounded-3xl w-full md:w-[370px] border border-white/20  shadow-lg shadow-black/40">
            <p className="text-white/70 text-xs sm:text-sm">Spent</p>
            <p className="text-white text-xl sm:text-2xl">0</p>
            <p className="text-orange-200 text-[1rem] sm:text-lg">
              Samurai Points
            </p>
          </div>

          <div className="flex flex-col justify-center bg-white/5 backdrop-blur-md h-[140px] p-8 rounded-3xl w-full md:w-[370px] border border-white/20  shadow-lg shadow-black/40">
            <p className="text-white text-xl sm:text-2xl">
              {userDetails?.tier}
            </p>
            <p className="text-orange-200 text-[1rem] sm:text-lg">Tier</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 w-full">
          <div className="flex flex-col justify-center bg-white/10 backdrop-blur-md h-[140px] p-8 rounded-3xl w-full md:w-[370px] border border-white/20  shadow-lg shadow-black/40">
            <p className="text-white/70 text-xs sm:text-sm">Total Tokens</p>
            <p className="text-white text-xl sm:text-2xl">
              {userDetails?.samBalance.toLocaleString("en-us")}
            </p>
            <p className="text-orange-200 text-[1rem] sm:text-lg">$SAM</p>
          </div>

          <div className="flex flex-col justify-center bg-white/10 backdrop-blur-md h-[140px] p-8 rounded-3xl w-full md:w-[370px] border border-white/20  shadow-lg shadow-black/40">
            <p className="text-white/70 text-xs sm:text-sm">Locked</p>
            <p className="text-white text-xl sm:text-2xl">
              {userDetails?.nftBalance}
            </p>
            <p className="text-orange-200 text-[1rem] sm:text-lg">SAM NFT</p>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-white/5 backdrop-blur-md w-full h-[140px] p-8 rounded-3xl md:w-[746px] border border-white/20  shadow-lg shadow-black/40">
          <p className="text-white/70 text-xs sm:text-sm">Balance</p>
          <p className="text-white text-xl sm:text-2xl">
            {userDetails?.points.toLocaleString("en-us")}
          </p>
          <p className="text-orange-200 text-[1rem] sm:text-lg">
            Samurai Points
          </p>
        </div>
      </div>

      {/* My Allocations */}
      {signer && account && (
        <div className="flex flex-col py-10 md:py-20 w-full bg-black border-t-[1px] border-samurai-red/40">
          <div className="flex flex-col lg:flex-row items-center justify-between lg:px-8 xl:px-16 text-white mb-2 lg:mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-center lg:text-start">
              My <span className="text-samurai-red">Allocations</span>
            </h2>
            <div className="flex items-center gap-2 mt-4 lg:mt-0 bg-white/10 w-full justify-center py-3 lg:bg-transparent lg:w-max lg:justify-start lg:py-0 border-t lg:border-none border-white/20">
              <span className="w-4 lg:w-6 h-4 lg:h-6 text-white">
                {network}
              </span>
              <SSSelect
                options={["All Networks"].concat(
                  IDO_CHAINS.map((item: any) => item?.name)
                )}
                onChange={(value) =>
                  onChangeFilters(FilterType.FilterChain, value)
                }
                value={filterChain}
              />
              <span className="w-2" />
              <span className="w-4 lg:w-6 h-4 lg:h-6 text-white">
                {distribution}
              </span>
              <SSSelect
                options={[
                  "All Status",
                  "TGE Unlocked",
                  "TGE Claimed",
                  "Vesting",
                  "Completed",
                ]}
                onChange={(value) =>
                  onChangeFilters(FilterType.FilterStatus, value)
                }
                value={filterStatus}
              />
            </div>
          </div>

          {!!userDetails && (
            <UserList
              IDOs={userDetails?.userIdos || []}
              allocations={userDetails?.allocations || {}}
              phases={userVestingDetails?.phases}
              tgesUnlocked={userVestingDetails?.tgesUnlocked}
              tgesClaimed={userVestingDetails?.tgesClaimed}
              filterChain={filterChain}
              filterStatus={filterStatus}
              onResetFilters={resetFilters}
            />
          )}
        </div>
      )}

      {/* Loading */}
      <LoadingBlocker open={loadingUser || loadingChart} />
    </div>
  );
}
