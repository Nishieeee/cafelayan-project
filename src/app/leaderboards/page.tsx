import { Trophy, Medal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function () {
  const communityLeaderboardData = [
    {
      rank: 1,
      name: "Giorno Giovanni",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 234,
      weight: 89.5,
      level: "Eco Guardian",
      isCurrentUser: false,
    },
    {
      rank: 2,
      name: "Irene Joestar",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 198,
      weight: 76.2,
      level: "Forest Friend",
      isCurrentUser: false,
    },
    {
      rank: 3,
      name: "Donquixote Donflamingo",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 167,
      weight: 62.8,
      level: "Forest Friend",
      isCurrentUser: false,
    },
    {
      rank: 4,
      name: "Jhon Clein Pagarogan",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 127,
      weight: 45.2,
      level: "Young Tree",
      isCurrentUser: true,
    },
    {
      rank: 5,
      name: "Roberto Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 112,
      weight: 41.7,
      level: "Sapling",
      isCurrentUser: false,
    },
  ];

  const brandLeaderboardsdata = [
    {
      rank: 1,
      name: "Cafelayan lettuce chips",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 234,
      weight: 89.5,
      level: "Eco Guardian",
      isCurrentUser: false,
    },
    {
      rank: 2,
      name: "Aquapure",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 198,
      weight: 76.2,
      level: "Forest Friend",
      isCurrentUser: false,
    },
    {
      rank: 3,
      name: "Pepsi",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 167,
      weight: 62.8,
      level: "Forest Friend",
      isCurrentUser: false,
    },
    {
      rank: 4,
      name: "Rita's Mushroom Chips",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 127,
      weight: 45.2,
      level: "Young Tree",
      isCurrentUser: true,
    },
    {
      rank: 5,
      name: "Kangkong Chips",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 112,
      weight: 41.7,
      level: "Sapling",
      isCurrentUser: false,
    },
  ];

  const organizationLeaderboards = [
    {
      rank: 1,
      name: "Kids Who Farm",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 234,
      weight: 89.5,
      level: "Eco Guardian",
      isCurrentUser: false,
    },
    {
      rank: 2,
      name: "Ecohub Philippines",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 198,
      weight: 76.2,
      level: "Forest Friend",
      isCurrentUser: false,
    },
    {
      rank: 3,
      name: "Cebu Eco Warriors",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 167,
      weight: 62.8,
      level: "Forest Friend",
      isCurrentUser: false,
    },
    {
      rank: 4,
      name: "Davao Recycling Hub",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 127,
      weight: 45.2,
      level: "Young Tree",
      isCurrentUser: true,
    },
    {
      rank: 5,
      name: "Kangkong ChipsRecycle Center BGC",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 112,
      weight: 41.7,
      level: "Sapling",
      isCurrentUser: false,
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Eco Guardian":
        return "bg-emerald-500 text-emerald-800 border-emerald-200";
      case "Forest Friend":
        return "bg-green-400 text-green-800 border-green-200";
      case "Young Tree":
        return "bg-emerald-400 text-green-200 border-green-200";
      case "Sapling":
        return "bg-lime-100 text-lime-800 border-lime-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };
  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="flex text-3xl font-bold text-gray-900 mb-2">
            <Trophy className="h-8 me-2" /> Leaderboards
          </h1>
          <p className="text-gray-600">
            Top Recyclers, Impactful Brands, and the Greenest Organizations.
          </p>
        </div>
        {/* Leaderboards */}
        <Tabs defaultValue="community" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-500">
            <TabsTrigger value="community">Commuity</TabsTrigger>
            <TabsTrigger value="brands">Brands</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
          </TabsList>

          <TabsContent value="community" className="space-y-6">
            <div className="bg-white border-0 rounded-lg shadow-sm p-4 mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Card className="border-gray-500/50 w-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Community Leaderboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {communityLeaderboardData.map((user, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-4 rounded-lg border border-gray-500/50 ${
                            user.isCurrentUser
                              ? "bg-blue-50 border-blue-200"
                              : "bg-white"
                          } hover:scale-102 hover:border-green-700 transition-all duration-300 ease`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 flex items-center justify-center">
                              {getRankIcon(user.rank)}
                            </div>
                            <Avatar className="w-10 h-10">
                              <AvatarImage
                                src={user.avatar || "/placeholder.svg"}
                                alt={user.name}
                              />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium flex items-center gap-2">
                                {user.name}
                                {user.isCurrentUser && (
                                  <Badge variant="outline">You</Badge>
                                )}
                              </h4>
                              <Badge
                                variant="outline"
                                className={getLevelColor(user.level)}
                              >
                                {user.level}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">
                              {user.donations}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.weight} kg donated
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* brand leaderboards */}
          <TabsContent value="brands">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Card className="border-gray-500/50 w-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Most Impactful Brands
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {brandLeaderboardsdata.map((user, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-4 rounded-lg border border-gray-500/50 ${
                            user.isCurrentUser
                              ? "bg-blue-50 border-blue-200"
                              : "bg-white"
                          } hover:scale-102 hover:border-green-700 transition-all duration-300 ease`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 flex items-center justify-center">
                              {getRankIcon(user.rank)}
                            </div>
                            <Avatar className="w-10 h-10">
                              <AvatarImage
                                src={user.avatar || "/placeholder.svg"}
                                alt={user.name}
                              />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium flex items-center gap-2">
                                {user.name}
                                {user.isCurrentUser && (
                                  <Badge variant="outline">You</Badge>
                                )}
                              </h4>
                              <Badge
                                variant="outline"
                                className={getLevelColor(user.level)}
                              >
                                {user.level}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">
                              {user.donations}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.weight} kg donated
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* organization leaderbaords */}
          <TabsContent value="organization">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Card className="border-gray-500/50 w-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-green-700" />
                      Greenest Organizations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {organizationLeaderboards.map((user, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-4 rounded-lg border border-gray-500/50 ${
                            user.isCurrentUser
                              ? "bg-blue-50 border-blue-200"
                              : "bg-white"
                          } hover:scale-102 hover:border-green-700 transition-all duration-300 ease`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 flex items-center justify-center">
                              {getRankIcon(user.rank)}
                            </div>
                            <Avatar className="w-10 h-10">
                              <AvatarImage
                                src={user.avatar || "/placeholder.svg"}
                                alt={user.name}
                              />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium flex items-center gap-2">
                                {user.name}
                                {user.isCurrentUser && (
                                  <Badge variant="outline">You</Badge>
                                )}
                              </h4>
                              <Badge
                                variant="outline"
                                className={getLevelColor(user.level)}
                              >
                                {user.level}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">
                              {user.donations}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.weight} kg donated
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
