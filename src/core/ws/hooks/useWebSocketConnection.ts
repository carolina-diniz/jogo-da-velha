import * as signalR from '@microsoft/signalr';
import { useEffect, useMemo, useState } from 'react';

interface UseWebSocketConnectionReturn {
  connection: signalR.HubConnection | null;
  isConnected: boolean;
  connectionId: string | undefined;
}

export function useWebSocketConnection(): UseWebSocketConnectionReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionId, setConnectionId] = useState<string | undefined>(undefined);

  const connection = useMemo(() => {
    const wsUrl = (import.meta.env?.VITE_WS_URL as string) ?? 'http://127.0.0.1:5046/GameHub';

    console.log('🔌 Conectando ao SignalR:', wsUrl);

    return new signalR.HubConnectionBuilder()
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
  }, []);

  useEffect(() => {
    // Previne iniciar conexão que já está rodando (React StrictMode)
    if (connection.state !== signalR.HubConnectionState.Disconnected) {
      return;
    }

    connection.onreconnecting(() => {
      setIsConnected(false);
      console.log('🔄 Reconectando...');
    });

    connection.onreconnected((connId) => {
      setIsConnected(true);
      setConnectionId(connId);
      console.log('✅ Reconectado:', connId);
    });

    connection.onclose(() => {
      setIsConnected(false);
      setConnectionId(undefined);
      console.log('❌ Desconectado');
    });

    connection
      .start()
      .then(() => {
        setIsConnected(true);
        setConnectionId(connection.connectionId ?? undefined);
        console.log('✅ Conectado:', connection.connectionId);
      })
      .catch((err) => console.error('❌ Erro na conexão:', err));

    return () => {
      if (connection.state === signalR.HubConnectionState.Connected) {
        connection.stop();
      }
    };
  }, [connection]);

  return {
    connection,
    isConnected,
    connectionId,
  };
}
