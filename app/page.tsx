import HeaderTractian from "@/components/common/HeaderTractian/HeaderTractian";
import ContainerMain from "@/components/ContainerMain/ContainerMain";
import ContentHeader from "@/components/Content/ContentHeader/ContentHeader";
import Content from "@/components/Content/Content";
import AssestList from "@/components/Content/AssestList/AssestList";
import MainComponent from "@/components/Content/MainComponent/MainComponent";
import { ToastContainer } from "react-toastify";

export default async function Home() {
  return (
    <div className="h-screen">
      <HeaderTractian></HeaderTractian>
      <ContainerMain>
        <ContentHeader></ContentHeader>
        <Content>
          <AssestList></AssestList>
          <MainComponent></MainComponent>
        </Content>
      </ContainerMain>
      <ToastContainer />
    </div>
  );
}
