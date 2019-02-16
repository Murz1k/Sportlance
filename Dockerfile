# FROM microsoft/dotnet:sdk AS build-env
# WORKDIR /app

# Copy csproj and restore as distinct layers
# COPY *.csproj ./
# RUN dotnet restore

# Copy everything else and build
# COPY . ./
# RUN dotnet publish -c Release -o out

# Build runtime image
#FROM microsoft/dotnet:aspnetcore-runtime
#WORKDIR /app
#COPY --from=build-env /app/out .
#ENTRYPOINT ["dotnet", "aspnetapp.dll"]
#
#FROM microsoft/aspnetcore:2.0
#WORKDIR /mymvcweb
#COPY bin/Release/netcoreapp2.0/publish . 
#ENV ASPNETCORE_URLS http://+:5000
#EXPOSE 5000
#ENTRYPOINT ["dotnet", "mymvcweb.dll"]


# -------- НОМЕР 1 --------


#FROM microsoft/dotnet:sdk AS build-env
#WORKDIR /app
#
## Copy csproj and restore as distinct layers
#COPY ./Sportlance.Common/*.csproj ./
#RUN cd ./Sportlance.Common && dotnet restore
#COPY ./Sportlance.Common ./
## Copy csproj and restore as distinct layers
#COPY ./Sportlance.WebAPI/*.csproj ./
#RUN cd ./Sportlance.WebAPI && dotnet restore
#COPY ./Sportlance.WebAPI ./
#
## Copy everything else and build
#RUN cd ./Sportlance.WebAPI && dotnet publish -c Release -o out
#
## Build runtime image
#FROM microsoft/dotnet:aspnetcore-runtime
#WORKDIR /app
#COPY --from=build-env /app/out .
#ENTRYPOINT ["dotnet", "Sportlance.WebAPI.dll"]


# -------- НОМЕР 2 --------


FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0 AS build
WORKDIR /src
COPY Sportlance.sln ./
COPY Sportlance.Common/*.csproj ./Sportlance.Common/
COPY Sportlance.WebAPI/*.csproj ./Sportlance.WebAPI/

RUN dotnet restore
COPY . .
WORKDIR /src/Sportlance.Common
RUN dotnet build -c Release -o /app

WORKDIR /src/Sportlance.WebAPI
RUN dotnet build -c Release -o /app

FROM build AS publish
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Sportlance.WebAPI.dll"]