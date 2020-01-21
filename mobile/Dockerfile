FROM imoverlord/expo-turtle:latest

WORKDIR /app

ENV EXPO_ANDROID_KEYSTORE_PASSWORD 52bba0a99f7c4e89a0ceee470e1e56d9
ENV EXPO_ANDROID_KEY_PASSWORD c1dfcc785234403da6b3dbd602cb7142

COPY . .

RUN npm i

RUN turtle build:android -u tam-epicture -p qwerty31 --keystore-path ./AREA.jks --keystore-alias QHRhbS1lcGljdHVyZS9BUkVB -t apk
