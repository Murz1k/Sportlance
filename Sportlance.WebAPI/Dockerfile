FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["Sportlance.WebAPI/Sportlance.WebAPI.csproj", "Sportlance.WebAPI/"]
RUN dotnet restore "Sportlance.WebAPI/Sportlance.WebAPI.csproj"
COPY . .
WORKDIR "/src/Sportlance.WebAPI"
RUN dotnet build "Sportlance.WebAPI.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Sportlance.WebAPI.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Sportlance.WebAPI.dll"]