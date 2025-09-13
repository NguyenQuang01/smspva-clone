"use client";

import { useParams, useRouter } from "next/navigation";
import { ServiceDetail } from "@/components/service-detail";

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();

  // Mock data - trong thực tế sẽ fetch từ API dựa trên serviceName
  const service = {
    name: params.serviceName as string,
    icon: "📱", // Mock icon
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ServiceDetail
      service={service}
      onBack={handleBack}
    />
  );
}
