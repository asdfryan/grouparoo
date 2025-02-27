import { RoutesConfig } from "actionhero";

const namespace = "routes";

declare module "actionhero" {
  export interface ActionheroConfigInterface {
    [namespace]: ReturnType<typeof DEFAULT[typeof namespace]>;
  }
}
export const DEFAULT: { [namespace]: () => RoutesConfig } = {
  [namespace]: () => {
    // prettier-ignore
    return {
      head: [
        { path: "/v:apiVersion/status/:route", action: "status:public", matchTrailingPathParts: true },
      ],

      get: [
        { path: "/v:apiVersion/account", action: "account:view" },
        { path: "/v:apiVersion/apiKey/:id", action: "apiKey:view" },
        { path: "/v:apiVersion/apiKeys", action: "apiKeys:list" },
        { path: "/v:apiVersion/app/:id", action: "app:view" },
        { path: "/v:apiVersion/app/:id/options", action: "app:options" },
        { path: "/v:apiVersion/apps", action: "apps:list" },
        { path: "/v:apiVersion/appRefreshQueries", action: "appRefreshQueries:list" },
        { path: "/v:apiVersion/appRefreshQuery/:id", action: "appRefreshQuery:view" },
        { path: "/v:apiVersion/destinations", action: "destinations:list" },
        { path: "/v:apiVersion/destination/:id", action: "destination:view" },
        { path: "/v:apiVersion/destination/:id/connectionOptions", action: "destination:connectionOptions" },
        { path: "/v:apiVersion/destination/:id/exportArrayProperties", action: "destination:exportArrayProperties" },
        { path: "/v:apiVersion/destination/:id/mappingOptions", action: "destination:mappingOptions" },
        { path: "/v:apiVersion/destination/:id/recordPreview", action: "destination:recordPreview" },
        { path: "/v:apiVersion/destinations/connectionApps", action: "destinations:connectionApps" },
        { path: "/v:apiVersion/export/:id", action: "export:view" },
        { path: "/v:apiVersion/exportProcessor/:id", action: "exportProcessor:view" },
        { path: "/v:apiVersion/exportProcessors", action: "exportProcessors:list" },
        { path: "/v:apiVersion/exports", action: "exports:list" },
        { path: "/v:apiVersion/exports/totals", action: "exports:totals" },
        { path: "/v:apiVersion/group/:groupId/records", action: "records:list" },
        { path: "/v:apiVersion/group/:id", action: "group:view" },
        { path: "/v:apiVersion/group/:id/countComponentMembers", action: "group:countComponentMembers" },
        { path: "/v:apiVersion/group/:id/countPotentialMembers", action: "group:countPotentialMembers" },
        { path: "/v:apiVersion/group/:id/destinations", action: "group:listDestinations" },
        { path: "/v:apiVersion/groups", action: "groups:list" },
        { path: "/v:apiVersion/groups/ruleOptions",action: "groups:ruleOptions" },
        { path: "/v:apiVersion/import/:id", action: "import:view" },
        { path: "/v:apiVersion/imports", action: "imports:list" },
        { path: "/v:apiVersion/logs", action: "logs:list" },
        { path: "/v:apiVersion/model/:id", action: "model:view" },
        { path: "/v:apiVersion/modelOptions", action: "model:options" },
        { path: "/v:apiVersion/models", action: "models:list" },
        { path: "/v:apiVersion/navigation", action: "navigation:list" },
        { path: "/v:apiVersion/notification/:id", action: "notification:view" },
        { path: "/v:apiVersion/notifications", action: "notifications:list" },
        { path: "/v:apiVersion/object/:id", action: "object:find" },
        { path: "/v:apiVersion/plugins", action: "plugins:list" },
        { path: "/v:apiVersion/properties", action: "properties:list" },
        { path: "/v:apiVersion/property/:id", action: "property:view" },
        { path: "/v:apiVersion/property/:id/filterOptions", action: "property:filterOptions" },
        { path: "/v:apiVersion/property/:id/groups", action: "property:groups" },
        { path: "/v:apiVersion/property/:id/pluginOptions", action: "property:pluginOptions" },
        { path: "/v:apiVersion/property/:id/recordPreview", action: "property:recordPreview" },
        { path: "/v:apiVersion/propertyOptions", action: "properties:options" },
        { path: "/v:apiVersion/record/:id", action: "record:view" },
        { path: "/v:apiVersion/record/:recordId/logs", action: "logs:list" },
        { path: "/v:apiVersion/records", action: "records:list" },
        { path: "/v:apiVersion/records/autocompleteRecordProperty", action: "records:autocompleteRecordProperty" },
        { path: "/v:apiVersion/run/:id", action: "run:view" },
        { path: "/v:apiVersion/runs", action: "runs:list" },
        { path: "/v:apiVersion/schedule/:id", action: "schedule:view" },
        { path: "/v:apiVersion/schedule/:id/filterOptions", action: "schedule:filterOptions" },
        { path: "/v:apiVersion/schedules", action: "schedules:list" },
        { path: "/v:apiVersion/session", action: "session:view" },
        { path: "/v:apiVersion/oauth/providers", action: "oAuth:listProviders" },
        { path: "/v:apiVersion/oauth/client/request/:requestId/view", action: "oAuth:client:view" },
        { path: "/v:apiVersion/setupSteps", action: "setupSteps:list" },
        { path: "/v:apiVersion/setting/core/cluster-name", action: "setting:view:core:cluster-name" },
        { path: "/v:apiVersion/settings", action: "settings:list" },
        { path: "/v:apiVersion/source/:id/connectionOptions", action: "source:connectionOptions" },
        { path: "/v:apiVersion/source/:id", action: "source:view" },
        { path: "/v:apiVersion/source/:id/defaultPropertyOptions", action: "source:defaultPropertyOptions" },
        { path: "/v:apiVersion/source/:id/preview", action: "source:preview" },
        { path: "/v:apiVersion/sources", action: "sources:list" },
        { path: "/v:apiVersion/sources/connectionApps", action: "sources:connectionApps" },
        { path: "/v:apiVersion/status/private", action: "status:private" },
        { path: "/v:apiVersion/status/public", action: "status:public" },
        { path: "/v:apiVersion/swagger", action: "swagger" },
        { path: "/v:apiVersion/team/:id", action: "team:view" },
        { path: "/v:apiVersion/team/:id/members", action: "teamMembers:list" },
        { path: "/v:apiVersion/team/member/:id", action: "teamMember:view" },
        { path: "/v:apiVersion/teamMembers", action: "teamMembers:list" },
        { path: "/v:apiVersion/teams", action: "teams:list" },
        { path: "/v:apiVersion/totals", action: "totals" },
      ],

      post: [
        { path: "/v:apiVersion/apiKey", action: "apiKey:create" },
        { path: "/v:apiVersion/app", action: "app:create" },
        { path: "/v:apiVersion/appRefreshQuery", action: "appRefreshQuery:create" },
        { path: "/v:apiVersion/appRefreshQuery/:id/run", action: "appRefreshQuery:run" },
        { path: "/v:apiVersion/config/apply", action: "config:apply" },
        { path: "/v:apiVersion/config/generate", action: "config:generate" },
        { path: "/v:apiVersion/config/user", action: "config:user:create" },
        { path: "/v:apiVersion/config/validate", action: "config:validate" },
        { path: "/v:apiVersion/destination", action: "destination:create" },
        { path: "/v:apiVersion/destination/:id/export", action: "destination:export" },
        { path: "/v:apiVersion/group", action: "group:create" },
        { path: "/v:apiVersion/model", action: "model:create" },
        { path: "/v:apiVersion/plugin/install", action: "plugin:install" },
        { path: "/v:apiVersion/plugin/uninstall", action: "plugin:uninstall" },
        { path: "/v:apiVersion/property", action: "property:create" },
        { path: "/v:apiVersion/record", action: "record:create" },
        { path: "/v:apiVersion/records/:modelId/import", action: "records:import" },
        { path: "/v:apiVersion/record/:id/export", action: "record:export" },
        { path: "/v:apiVersion/record/:id/import", action: "record:import" },
        { path: "/v:apiVersion/schedule", action: "schedule:create" },
        { path: "/v:apiVersion/schedule/:id/run", action: "schedule:run" },
        { path: "/v:apiVersion/schedules/run", action: "schedules:run" },
        { path: "/v:apiVersion/session", action: "session:create" },
        { path: "/v:apiVersion/oauth/:provider/client/start", action: "oAuth:client:start" },
        { path: "/v:apiVersion/source", action: "source:create" },
        { path: "/v:apiVersion/source/:id/bootstrapUniqueProperty", action: "source:bootstrapUniqueProperty" },
        { path: "/v:apiVersion/source/:id/generateSampleRecords", action: "source:generateSampleRecords" },
        { path: "/v:apiVersion/team", action: "team:create" },
        { path: "/v:apiVersion/team/initialize", action: "team:initialize" },
        { path: "/v:apiVersion/team/member", action: "teamMember:create" },
      ],

      put: [
        { path: "/v:apiVersion/account", action: "account:edit" },
        { path: "/v:apiVersion/apiKey/:id", action: "apiKey:edit" },
        { path: "/v:apiVersion/app/:id", action: "app:edit" },
        { path: "/v:apiVersion/app/:id/test", action: "app:test" },
        { path: "/v:apiVersion/appRefreshQuery/:id", action: "appRefreshQuery:edit" },
        { path: "/v:apiVersion/appRefreshQuery/:id/test", action: "appRefreshQuery:test" },
        { path: "/v:apiVersion/destination/:id", action: "destination:edit" },
        { path: "/v:apiVersion/group/:id", action: "group:edit" },
        { path: "/v:apiVersion/group/:id/run", action: "group:run" },
        { path: "/v:apiVersion/model/:id", action: "model:edit" },
        { path: "/v:apiVersion/property/:id", action: "property:edit" },
        { path: "/v:apiVersion/property/:id/test", action: "property:test" },
        { path: "/v:apiVersion/property/:id/makeIdentifying", action: "property:makeIdentifying" },
        { path: "/v:apiVersion/records/importAndUpdate", action: "records:importAndUpdate" },
        { path: "/v:apiVersion/run/:id", action: "run:edit" },
        { path: "/v:apiVersion/schedule/:id", action: "schedule:edit" },
        { path: "/v:apiVersion/setting/:id", action: "setting:edit" },
        { path: "/v:apiVersion/oauth/client/request/:requestId/edit", action: "oAuth:client:edit" },
        { path: "/v:apiVersion/setupStep/:id", action: "setupStep:edit" },
        { path: "/v:apiVersion/source/:id", action: "source:edit" },
        { path: "/v:apiVersion/team/:id", action: "team:edit" },
        { path: "/v:apiVersion/team/member/:id", action: "teamMember:edit" },
      ],

      delete: [
        { path: "/v:apiVersion/apiKey/:id", action: "apiKey:destroy" },
        { path: "/v:apiVersion/app/:id", action: "app:destroy" },
        { path: "/v:apiVersion/appRefreshQuery/:id", action: "appRefreshQuery:destroy" },
        { path: "/v:apiVersion/destination/:id", action: "destination:destroy" },
        { path: "/v:apiVersion/group/:id", action: "group:destroy" },
        { path: "/v:apiVersion/model/:id", action: "model:destroy" },
        { path: "/v:apiVersion/property/:id", action: "property:destroy" },
        { path: "/v:apiVersion/record/:id", action: "record:destroy" },
        { path: "/v:apiVersion/reset/cache", action: "reset:cache" },
        { path: "/v:apiVersion/reset/cluster", action: "reset:cluster" },
        { path: "/v:apiVersion/reset/data", action: "reset:data" },
        { path: "/v:apiVersion/schedule/:id", action: "schedule:destroy" },
        { path: "/v:apiVersion/session", action: "session:destroy" },
        { path: "/v:apiVersion/source/:id", action: "source:destroy" },
        { path: "/v:apiVersion/team/:id", action: "team:destroy" },
        { path: "/v:apiVersion/team/member/:id", action: "teamMember:destroy" },

      ]
    };
  },
};
