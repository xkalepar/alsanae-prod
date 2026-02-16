import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { PiArticleMediumThin } from "react-icons/pi";
import InfoCard from "./components/info-card";
import { getUsers } from "@/database/users";
import { FaUsersCog } from "react-icons/fa";
import { FaFileWaveform, FaUserGroup } from "react-icons/fa6";
import { TbMessage } from "react-icons/tb";
import { getProjects } from "@/lib/data";

const dashboardPage = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const employees = await getUsers({});
  const projects = await getProjects("ar");

  const lang = (await params).lang;
  return (
    <main className="container mt-4">
      <Breadcrumb className="my-2" dir="rtl">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/`}>الرئيسية</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>لوحة التحكم</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="font-bold text-right text-2xl">لوحة التحكم</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:gap-3 md:gap-2 gap-1 lg:gap-4 my-4 sm:grid-cols-2">
        <InfoCard
          className="bg-violet-500"
          title="الموظفين"
          icon={<FaUsersCog size={24} />}
          content={`${employees.length}`}
          href={`/${lang}/dashboard/users`}
        >
          كل الموظفين
        </InfoCard>
        <InfoCard
          href={`/${lang}/dashboard/projects`}
          className=" bg-sky-500"
          title="المشاريع"
          icon={<PiArticleMediumThin size={24} />}
          content={`${projects.length}`}
        >
          كل المشاريع
        </InfoCard>
      </div>
    </main>
  );
};

export default dashboardPage;
