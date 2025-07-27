"use client";

import { useQuery } from "@tanstack/react-query";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { getRestaurantBySubdomain } from "@/actions/get-restaurant-by-subdomain";
import { useParams } from "next/navigation";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();

  const subdomain = (params?.subdomain as string) || "";

  const {
    data: restaurant,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["restaurant", subdomain],
    queryFn: () => getRestaurantBySubdomain(subdomain),
    enabled: !!subdomain,
  });

  return <div>{children}</div>;
}
