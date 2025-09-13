"use client";

import { useParams, useRouter } from "next/navigation";
import { CountryDetail } from "@/components/country-detail";

export default function CountryDetailPage() {
  const params = useParams();
  const router = useRouter();

  // Mock data - trong thực tế sẽ fetch từ API dựa trên countryName
  const country = {
    name: params.countryName as string,
    flag: "🇺🇸", // Mock flag
    price: "$0.10",
    available: true,
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <CountryDetail
      country={country}
      onBack={handleBack}
    />
  );
}
