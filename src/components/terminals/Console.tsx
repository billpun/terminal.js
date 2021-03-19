import React, { useEffect, useRef } from 'react';

import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { Unicode11Addon } from 'xterm-addon-unicode11';
import os from 'os';

const Console = (props: any) => {
  const xterm = useRef(null);
  useEffect(() => {
    const terminal = new Terminal({ rendererType: 'dom' });
    if (xterm.current !== null && Object.keys(props).length > 0) {
      const fitAddon = new FitAddon();
      const un11Addon = new Unicode11Addon();
      terminal.loadAddon(fitAddon);
      terminal.loadAddon(un11Addon);
      terminal.unicode.activeVersion = '11';
      terminal.open(xterm.current!);
      fitAddon.fit();
      const shell = os.platform() === 'win32' ? 'cmd.exe' : 'bash';

      // eslint-disable-next-line global-require
      const pty = require('node-pty');
      const ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env,
      });

      ptyProcess.on('data', (data: string | Uint8Array) => {
        const text =
          data.constructor === Uint8Array
            ? new TextDecoder().decode(data)
            : data;
        terminal.write(text);
        props.getData(text);
      });

      terminal.setOption('fontFamily', '"Source Code Pro", monospace');
      terminal.onData((e) => {
        ptyProcess.write(e);
      });
    }
    return () => {
      terminal.dispose();
    };
  }, [props]);

  return <div ref={xterm} style={{ width: '100%', height: '100%' }} />;
};

export default Console;
