import React, { FC, useEffect, useState } from 'react';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import store, { actions } from '../../stores/assets';

import Alert from './Alert';

import HistoryEventCard from './HisotryEventCard';
import PriceHistoryCard from './PriceHistoryCard';

import PurchaseCard from './PurchaseCard';
import DetailContainer from './DetailContainer';
import ImageCard from './ImageCard';
import IntroCard from './IntroCard';
import MetaCard from './MetaCard';
import AboutCard from './AboutCard';

import PurchaseModal from './PurchaseModal';
import SalesSettingModal from './SalesSettingModal';

import { GetCollections, GetItems } from '../../api/graph';
import { toFixedDecimals } from '../../utils';

const Detail: FC = () => {
  const { t } = useTranslation();

  const params = useParams<{ id: string }>();

  const { data: assetsResponse } = GetItems({ id: Number(params?.id) ?? -1, pageSize: 1 });

  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const { selectedAsset } = store.useState('selectedAsset');

  const { data: collectionsResponse } = GetCollections({
    id: selectedAsset?.collectionId,
    pageSize: 1,
  });

  useEffect(() => {
    const assets = assetsResponse?.assets?.assets ?? [];
    if (!selectedAsset && assets[0]) {
      actions.selectAsset(assets[0]);
    }

    return () => {
      //
    };
  }, [assetsResponse]);

  useEffect(() => {
    const collections = collectionsResponse?.collections?.collections ?? [];
    if (!categoryName && collections[0]) {
      setCategoryName(collections[0].name);
    }
  }, [collectionsResponse]);

  if (!selectedAsset) {
    return (
      <Box height="100vh" width="100vw">
        <Center height="100%">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      </Box>
    );
  }

  // Events
  const handlePurchaseClose = () => {
    setPurchaseOpen(false);
  };

  const handlePurchaseConfirm = () => {
    //
  };

  const handleSettingClose = () => {
    setSettingOpen(false);
  };

  const handleSettingConfirm = () => {
    // TODO
  };

  const handleDestroy = () => {
    //
  };

  return (
    <Box>
      <Alert
        // onDestroy={handleDestroy}
        onSetting={() => setSettingOpen(true)}
      />

      <DetailContainer
        left={
          <>
            <ImageCard src={selectedAsset.picUrl ?? 'image placeholder'} />
            <IntroCard description={selectedAsset.describe ?? t('detail.no-description')} />
            <MetaCard metadata={selectedAsset.metadata ?? t('detail.no-metadata')} />
            <AboutCard about={undefined ?? t('detail.no-about')} />
          </>
        }
        right={
          <>
            <PurchaseCard
              category={categoryName}
              name={selectedAsset.name}
              price={toFixedDecimals(selectedAsset.price, 8)}
              onPurchase={() => setPurchaseOpen(true)}
            />
            <PriceHistoryCard />
            <HistoryEventCard />
          </>
        }
      />

      <PurchaseModal
        item={selectedAsset}
        count={1}
        category={categoryName}
        open={purchaseOpen}
        onClose={handlePurchaseClose}
        onConfirm={handlePurchaseConfirm}
      />

      <SalesSettingModal
        open={settingOpen}
        onClose={handleSettingClose}
        onConfirm={handleSettingConfirm}
      />
    </Box>
  );
};

export default Detail;
