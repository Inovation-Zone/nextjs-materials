import { Breadcrumb, Col, Space, Typography } from "antd";
import React from "react";

import { useTranslate } from "@/hooks/useTranslate";

import Adhesive from "@/components/adhesive";
import Size from "@/components/size";
import Thickness from "@/components/thickness";
import WoodType from "@/components/woodType";

interface ProductSettingsProps {
  id?: string;
}

const ProductSettings: React.FC<ProductSettingsProps> = () => {
  const translate = useTranslate();

  return (
    <Space
      direction="vertical"
      size='small'
      className='flex'>
      <Breadcrumb>
        <Breadcrumb.Item>{translate.home.title}</Breadcrumb.Item>
        <Breadcrumb.Item>{translate.products.title}</Breadcrumb.Item>
        <Breadcrumb.Item>{translate.common.settings}</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={2}>{translate.common.settings}</Typography.Title>
      <Col className="flex flex-col gap-6">
        <Col className="flex flex-col gap-2">
          <Typography className="font-bold flex items-center">{translate.woodTypes.name}</Typography>
          <WoodType />
          <Typography className="text-sm italic">{translate.common.clickItemToEdit}</Typography>
        </Col>
        <Col className="flex flex-col gap-2">
          <Typography className="font-bold">{translate.adhesives.name}</Typography>
          <Adhesive />
          <Typography className="text-sm italic">{translate.common.clickItemToEdit}</Typography>
        </Col>
        <Col className="flex flex-col gap-2">
          <Typography className="font-bold">{translate.thicknesses.name}</Typography>
          <Thickness />
          <Typography className="text-sm italic">{translate.common.clickItemToEdit}</Typography>
        </Col>
        <Col className="flex flex-col gap-2">
          <Typography className="font-bold">{translate.sizes.name}</Typography>
          <Size />
          <Typography className="text-sm italic">{translate.common.clickItemToEdit}</Typography>
        </Col>
      </Col>
    </Space>
  );
};

export default ProductSettings;
