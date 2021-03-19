import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { Unicode11Addon } from 'xterm-addon-unicode11';

const SSHClient = require('ssh2').Client;
const fs = require('fs');

const Terminal = (props: any) => {
  const xterm = useRef(null);

  useEffect(() => {
    const terminal = new XTerm({ rendererType: 'dom' });
    if (xterm.current !== null && Object.keys(props).length > 0) {
      const fitAddon = new FitAddon();
      const un11Addon = new Unicode11Addon();
      terminal.loadAddon(fitAddon);
      terminal.loadAddon(un11Addon);
      terminal.setOption('fontFamily', '"Source Code Pro", monospace');
      terminal.open(xterm.current!);
      fitAddon.fit();

      const { config } = props;
      try {
        if (fs.existsSync(config.secret)) {
          config.privateKey = fs.readFileSync(config.secret);
          delete config.password;
        }
      } catch (err) {
        config.password = config.secret;
        delete config.privateKey;
      }

      const conn = new SSHClient();
      conn
        .on('ready', () => {
          terminal.write('\r\n*** SSH CONNECTION ESTABLISHED ***\r\n');
          conn.shell((err: any, stream: any) => {
            if (err) {
              terminal.write(`\r\n*** SSH SHELL ERROR: ${err.message} ***\r\n`);
            } else {
              terminal.onData((e) => {
                stream.write(e);
              });
              stream
                .on('data', (d: any) => {
                  const text = Buffer.from(d).toString();
                  terminal.write(text);
                  props.getData(text);
                })
                .on('close', () => {
                  conn.end();
                });
            }
          });
        })
        .on('close', () => {
          terminal.write('\r\n*** SSH CONNECTION CLOSED ***\r\n');
        })
        .on('error', (err: any) => {
          terminal.write(
            `\r\n*** SSH CONNECTION ERROR: ${err.message} ***\r\n`
          );
        })
        .connect(config);
    }
    return () => {
      terminal.dispose();
    };
  }, [props]);

  return <div ref={xterm} style={{ width: '100%', height: '100%' }} />;
};

export default Terminal;
