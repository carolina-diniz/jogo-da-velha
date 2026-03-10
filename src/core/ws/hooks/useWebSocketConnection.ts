import * as signalR from '@microsoft/signalr';
import { useEffect, useState } from 'react';

interface UseWebSocketConnectionReturn {
  connection: signalR.HubConnection | null;
  isConnected: boolean;
  connectionId: string | undefined;
}

export function useWebSocketConnection(): UseWebSocketConnectionReturn {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionId, setConnectionId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const wsUrl = (import.meta.env?.VITE_WS_URL as string) ?? 'https://jogo.kaworii.com.br/GameHub';

    console.log('🔌 Conectando ao SignalR:', wsUrl);

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(wsUrl, {
        skipNegotiation: false,
        transport:
          signalR.HttpTransportType.WebSockets |
          signalR.HttpTransportType.ServerSentEvents |
          signalR.HttpTransportType.LongPolling,
      })
      .withAutomaticReconnect({ nextRetryDelayInMilliseconds: () => 1000 })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    newConnection.onreconnecting(() => {
      setIsConnected(false);
      console.log('🔄 Reconectando...');
    });

    newConnection.onreconnected((connId) => {
      setIsConnected(true);
      setConnectionId(connId);
      console.log('✅ Reconectado:', connId);
    });

    newConnection.onclose(() => {
      setIsConnected(false);
      setConnectionId(undefined);
      console.log('❌ Desconectado');
    });

    newConnection
      .start()
      .then(() => {
        setConnection(newConnection);
        setIsConnected(true);
        setConnectionId(newConnection.connectionId ?? undefined);
        console.log('✅ Conectado:', newConnection.connectionId);
      })
      .catch((err: unknown) => {
        // AbortError esperado no StrictMode do React em dev (cleanup durante o start)
        if ((err as Error)?.name === 'AbortError') return;
        if ((err as Error)?.message?.includes('stop() was called')) return;
        console.error('❌ Erro na conexão:', err);
      });

    return () => {
      newConnection.stop().catch((error) => console.log('❌ Erro ao parar a conexão:', error));
    };
  }, []);

  return {
    connection,
    isConnected,
    connectionId,
  };
}
