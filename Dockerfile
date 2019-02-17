FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app
EXPOSE 80


FROM microsoft/aspnetcore-build:2.0 AS build
WORKDIR /app

COPY Sportlance.sln ./									
COPY Sportlance.Common/*.csproj ./Sportlance.Common/	
COPY Sportlance.WebAPI/*.csproj ./Sportlance.WebAPI/

RUN dotnet restore	


FROM microsoft/dotnet:2.2-sdk AS build-2.1
WORKDIR /app

COPY --from=build /app .	

COPY Sportlance.MailService/*.csproj ./Sportlance.MailService/
RUN dotnet restore	

# Восстанавливаем все зависимые либы
COPY ./Sportlance.Common/ ./Sportlance.Common/
COPY ./Sportlance.MailService/ ./Sportlance.MailService/
COPY ./Sportlance.WebAPI/ ./Sportlance.WebAPI/

RUN dotnet publish -c Release -o /app/out											


FROM base AS final
WORKDIR /app
# Создаем еще один докер, в который заливаем готовый проект и запускаем
COPY --from=build-2.1 /app/out .	

ENTRYPOINT ["dotnet", "Sportlance.WebAPI.dll"]