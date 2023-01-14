import { create } from 'zustand';
import { ServerType } from '@/types/server.type';
import { invoke } from '@tauri-apps/api';

interface ServerStore {
  servers: ServerType[];
  selectedServer: ServerType | null;
  setSelectedServer: (selectedServer: ServerType | null) => void;
  loadServers: (selectServerWithId?: number) => void;
  deleteServer: (serverId: number) => void;
  editServer: (serverId: number, connection: string, name: string) => void;
}

export const useServerStore = create<ServerStore>((set) => ({
  servers: [],
  selectedServer: null,
  setSelectedServer: (selectedServer) => set({ selectedServer }),
  loadServers(selectServerWithId) {
    invoke('read_servers')
      .then((servers: any) => {
        set({ servers });

        // select server if id is given
        if (selectServerWithId) {
          // check if database exist in loaded data
          let filteredServer = servers.filter(
            (server: ServerType) => server.id === selectServerWithId
          );

          if (filteredServer.length == 1) {
            set({ selectedServer: filteredServer[0] });
          }
        }
      })
      .catch(console.log);
  },
  editServer(serverId, connection, name) {
    set((state) => ({
      servers: state.servers.map((server) => {
        if (serverId === server.id) {
          server.name = name;
          server.connection = connection;
        }

        return server;
      }),
    }));
  },
  deleteServer(serverId) {
    set((state) => ({
      servers: state.servers.filter((server) => server.id !== serverId),
    }));
  },
}));
