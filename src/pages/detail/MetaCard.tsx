import { Stack, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ReactJson from 'react-json-view';

import Card from '../../components/card';
import Meta from './Meta';

export interface MetaCardProps {
  metadata: string;
  owner?: string;
}

const MetaCard: FC<MetaCardProps> = ({ metadata, owner }) => {
  const { t } = useTranslation();

  return (
    <Card title={t('detail.title.metadata')}>
      <Stack>
        {owner && <Meta description={t('detail.meta.create')} who={owner} />}
        {/* <Text color="#4d5058">{metadata}</Text> */}
        <ReactJson
          name={false}
          src={metadata}
          indentWidth={1}
          collapseStringsAfterLength={100}
          enableClipboard={false}
          displayDataTypes={false}
        />
      </Stack>
    </Card>
  );
};

export default MetaCard;
