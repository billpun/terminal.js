import {
  EuiButton,
  EuiFieldPassword,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';
import React, { useState } from 'react';
import Console from '../terminals/Console';
import Terminal from '../terminals/Terminal';

const ConsoleItem = () => {
  const initialize = () => <Console />;
  const [term, setTerm] = useState(initialize());

  const getConsoleData = (data: string) => {
    console.log(data);
  };

  return (
    <EuiFlexGroup direction="column" gutterSize="s" style={{ padding: 10 }}>
      <EuiFlexItem grow={false} style={{ width: 250 }}>
        <EuiFlexGroup gutterSize="s">
          <EuiFlexItem>
            <EuiButton
              size="s"
              onClick={() => {
                setTerm(<Console getData={getConsoleData} />);
              }}
            >
              Connect
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButton
              size="s"
              color="warning"
              onClick={() => {
                setTerm(initialize());
              }}
            >
              Disconnect
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem style={{ height: 250 }}>{term}</EuiFlexItem>
    </EuiFlexGroup>
  );
};

const TerminalItem = () => {
  const initialize = () => <Terminal />;
  const [term, setTerm] = useState(initialize());

  const [config, setConfig] = useState({
    host: 'localhost',
    port: 22,
    username: 'bill',
    secret: '',
  });

  const getConsoleData = (data: string) => {
    console.log(data);
  };

  return (
    <EuiFlexGroup gutterSize="s" alignItems="flexStart" style={{ padding: 10 }}>
      <EuiFlexItem grow={false} style={{ width: 250 }}>
        <EuiFlexGroup direction="column" gutterSize="s">
          <EuiFlexItem style={{ padding: 0 }}>
            <EuiFieldText
              compressed
              placeholder="Username"
              value={config.username}
              onChange={(e) =>
                setConfig({ ...config, username: e.target.value })
              }
              aria-label="Use aria labels when no actual label is in use"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGroup gutterSize="none">
              <EuiFlexItem>
                <EuiFieldText
                  compressed
                  placeholder="Host"
                  value={config.host}
                  onChange={(e) =>
                    setConfig({ ...config, host: e.target.value })
                  }
                />
              </EuiFlexItem>
              <EuiFlexItem grow={false} style={{ width: 50 }}>
                <EuiFieldText
                  compressed
                  placeholder="Port"
                  value={config.port}
                  onChange={(e) =>
                    setConfig({ ...config, port: Number(e.target.value) })
                  }
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFieldPassword
              compressed
              placeholder="Secret"
              value={config.secret}
              onChange={(e) => setConfig({ ...config, secret: e.target.value })}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGroup gutterSize="s">
              <EuiFlexItem>
                <EuiButton
                  size="s"
                  onClick={() => {
                    setTerm(
                      <Terminal config={config} getData={getConsoleData} />
                    );
                  }}
                >
                  Connect
                </EuiButton>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiButton
                  size="s"
                  color="warning"
                  onClick={() => {
                    setTerm(initialize());
                  }}
                >
                  Disconnect
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem style={{ height: 250 }}>{term}</EuiFlexItem>
    </EuiFlexGroup>
  );
};

const Main = () => {
  return (
    <div>
      <ConsoleItem />
      <TerminalItem />
    </div>
  );
};

export default Main;
