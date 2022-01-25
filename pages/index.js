import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useRouter } from 'next/router';

import React, { useState } from 'react';
import appConfig from '../config.json';

function Titulo(props) {
  const Tag = props.tag;
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
      ${Tag} {
        color: ${appConfig.theme.colors.primary["015"]};
        font-size: 24px;
        font-weight: 600;
      }
    `}</style>
    </>
  );
}

const ImageFallback = (props) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(false);
  const [oldSrc, setOldSrc] = useState(src);
  if (oldSrc !== src) {
    setImgSrc(false)
    setOldSrc(src)
  }
  return (
    <Image
      {...rest}
      src={imgSrc ? fallbackSrc : src}
      onError={() => {
        setImgSrc(true);
      }}
    />
  );
};

export default function PaginaInicial() {
  const [username, setUsername] = React.useState();
  const [disabled, setDisabled] = React.useState(true);
  const roteamento = useRouter();

  return (
    <>

      <Box
        styleSheet={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          width: { xs: '100%', sm: '50%' }, textAlign: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary['000'],
          flex: 'column',
        }}
      >
        <Image styleSheet={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
          width: {
            xs: '120px',
            sm: '300px',
          },
        }}
          src={`https://logodownload.org/wp-content/uploads/2017/08/pokemon-logo.png`} />
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.primary['005'],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              roteamento.push('/chat')
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '10px', color: appConfig.theme.colors.primary['015'] }}>
              {appConfig.name}
            </Text>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.primary['015'] }}>
              Informe seu usuário no GitHub:
            </Text>
            {<TextField
              value={username}
              onChange={function (event) {
                const valor = event.target.value;
                if (valor.length > 2) {
                  setDisabled(false)
                };
                setUsername(valor);
              }
              }

              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.primary['015'],
                  mainColor: appConfig.theme.colors.primary['015'],
                  mainColorHighlight: appConfig.theme.colors.primary['000'],
                  backgroundColor: appConfig.theme.colors.primary['010'],
                },
              }}
            />}
            <Button
              type='submit'
              label='Entrar'
              disabled={disabled}
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.primary["000"],
                mainColor: appConfig.theme.colors.primary['010'],
                mainColorLight: appConfig.theme.colors.primary['015'],
                mainColorStrong: appConfig.theme.colors.primary['015'],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.primary['010'],
              border: '1px solid',
              borderColor: appConfig.theme.colors.primary['000'],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >

            <ImageFallback
              styleSheet={{
                height: '166px',
                weight: '166px',
                borderRadius: '50%',
                marginBottom: '16px'
              }}
              value={username}
              src={`https://github.com/${username}.png`}
              fallbackSrc={`https://i.pinimg.com/originals/6f/7d/ac/6f7dac2181f81b083c45dd2df64406de.jpg`}
            />

            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.primary['015'],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}