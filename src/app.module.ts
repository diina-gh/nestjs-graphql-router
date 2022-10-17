import { Module } from '@nestjs/common';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { GraphQLModule } from '@nestjs/graphql';
import { AUTH_SUBGRAPH, LOCATION_SUBGRAPH, PRODUCT_SUBGRAPH, SHIPPING_SUBGRAPH } from './_commons/dotenv';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // ... Apollo server options
        cors: true,
        debug: true,
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'auth', url: AUTH_SUBGRAPH },
            { name: 'product', url: PRODUCT_SUBGRAPH },
            { name: 'location', url: LOCATION_SUBGRAPH },
            { name: 'shipping', url: SHIPPING_SUBGRAPH },
          ],
        }),
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
