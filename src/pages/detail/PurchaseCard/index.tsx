import React, { FC } from 'react';
import { Box, Button, Heading, Stack, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Card from '../../../components/card';
import colors from '../../../themes/colors';
import Meta from '../Meta';

export interface InnerCardProps {
  price: number | string;
  onPurchase: () => void;
  onCancel: () => void;
  order: any;
  onSetting: () => void;
  isOwner: boolean;
}

const InnerCard: FC<InnerCardProps> = ({
  price,
  onPurchase,
  onCancel,
  order = null,
  onSetting,
  isOwner,
}) => {
  const { t } = useTranslation();

  return (
    <Card
      title={
        <Box p={4}>
          {order && <Text color={colors.text.gray}>{t('detail.current-price')}</Text>}
          {order ? (
            <Box>
              {!isOwner && (
                <Button
                  variant="primary"
                  width="180px"
                  height="50px"
                  float="right"
                  onClick={() => onPurchase()}
                >
                  {t('detail.purchase')}
                </Button>
              )}
              {isOwner && (
                <Button
                  variant="primary"
                  width="180px"
                  height="50px"
                  float="right"
                  onClick={onCancel}
                >
                  {t('detail.cancel')}
                </Button>
              )}
            </Box>
          ) : (
            <Box>
              {isOwner && (
                <Button
                  variant="primary"
                  width="180px"
                  height="50px"
                  float="right"
                  onClick={() => onSetting()}
                >
                  {t('order.setting')}
                </Button>
              )}
            </Box>
          )}
        </Box>
      }
      backgroundColor="#f9f8fd"
      noHeadBorder
    >
      {order && (
        <Box marginTop="-1rem">
          <Heading display="inline">{price}</Heading> <Text display="inline">NMT</Text>
        </Box>
      )}
    </Card>
  );
};

export interface PurchaseCardProps {
  name: string;
  category: string;
  price: number | string;
  owner?: string;
  onPurchase: () => void;
  onSetting: any;
  onCancel: any;
  isOwner: boolean;
}

const PurchaseCard: FC<PurchaseCardProps> = ({
  category,
  name,
  owner,
  price,
  onPurchase,
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <Card title={<Text color={colors.primary}>{category}</Text>} noHeadBorder>
      <Stack marginTop="-1rem" spacing={4}>
        <Flex justify="space-between" align="flex-end">
          <Heading as="h2" size="lg">
            {name}
          </Heading>
          {owner && <Meta description="Owned by" who={owner} />}
        </Flex>
        <InnerCard price={price} onPurchase={onPurchase} {...rest}></InnerCard>
      </Stack>
    </Card>
  );
};

export default PurchaseCard;
