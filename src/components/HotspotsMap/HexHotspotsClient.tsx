"use client"
import 'dotenv/config'
import { Dialog, DialogPanel, Flex, Text, Title } from '@tremor/react';
import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';


export function HexHotspotsClient({ miners }: { miners: Miner[] }) {
  const [openModal, setOpenModal] = useState<string | null>(null);

  if (miners.length === 0) {
    return (
      <div className="mb-2 text-sm font-medium text-gray-900 dark:text-zinc-200">
        This hex contains no miners.
      </div>
    );
  }

  if (miners.length === 0) {
    return (
      <div className="mb-2 text-sm font-medium text-gray-900 dark:text-zinc-200">
        This hex contains no miners.
      </div>
    );
  }

  return (
    <div className="relative flex-1">
      {miners.map((miner) => (
        <div key={miner._id} className="flex items-center justify-between p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-zinc-200">{miner.nickname || miner.name}</div>
            <div className="text-xs text-gray-500 dark:text-zinc-400">{miner.hexId}</div>
          </div>
          <button onClick={() => setOpenModal(miner._id)} className="text-blue-500">Infos</button>

          <Dialog
            open={openModal === miner._id}
            onClose={() => setOpenModal(null)}
            static={true}
            className="fixed inset-0 z-[100] overflow-y-auto"
          >
            <Flex
              className="min-h-screen"
              flexDirection='col'
              justifyContent='start'
              alignItems='center'
              style={{ paddingTop: '20vh' }}
            >
              <DialogPanel className="w-full max-w-lg sm:max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative">

                <div className="absolute right-0 top-0 pr-3 pt-3">
                  <button
                    type="button"
                    className="rounded-tremor-small p-2 text-tremor-content-subtle hover:bg-tremor-background-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:bg-dark-tremor-background-subtle hover:dark:text-tremor-content"
                    onClick={() => setOpenModal(null)}
                    aria-label="Close"
                  >
                    <XMarkIcon
                      className="h-5 w-5 shrink-0"
                      aria-hidden={true}
                    />
                  </button>
                </div>
                <div className='mb-5'>
                  <Title> {`${miner.name} (${miner.nickname ?? 'No nickname'})`}</Title>
                  <Text className='text-gray-300'>Hex ID: {miner.hexId}</Text>
                  <Text className='text-gray-300'>Owner: {miner.address} </Text>
                  {miner.mac && <Text className='text-gray-300'>MAC: {miner.mac}</Text>}
                  {miner.verified && <Text className='text-gray-300'>Position: {miner.position?.lat}, {miner.position?.lng}</Text>}
                  {miner.byod && <Text className='text-gray-300'>BYOD: {miner.byod}</Text>}

                  {/* Add more miner information here */}
                </div>

              </DialogPanel>
            </Flex>
          </Dialog>
        </div>
      ))}
    </div>
  );
}


export interface Miner {
  _id: string;
  user_id: string;
  nickname?: string;
  miner_key: string;
  name: string;
  apikey?: string;
  mac?: string;
  byod?: string;
  created_at: Date;
  position: {
    lat: number;
    lng: number;
  };
  hexId: string;
  verified: boolean;
  reward_wallet: string;
  is_registered: boolean;
  address: string;
  email: string;
  __v: number;

}