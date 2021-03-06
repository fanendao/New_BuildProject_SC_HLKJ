USE [New_DB_Build_SC_HLKJ]
GO
/****** Object:  Table [dbo].[ts_function]    Script Date: 11/25/2016 18:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ts_function](
	[function_Id] [bigint] NOT NULL,
	[function_ParentID] [bigint] NULL,
	[function_Name] [varchar](150) NULL,
	[function_bz] [varchar](150) NULL,
	[function_ioc] [varchar](150) NULL,
	[function_Url] [varchar](500) NULL,
	[function_order] [bigint] NULL,
	[function_IsCompany] [varchar](50) NULL,
	[function_IsProject] [varchar](50) NULL,
	[function_depth] [int] NULL,
	[function_isClick] [varchar](50) NULL,
	[function_IsTip] [varchar](50) NULL,
	[function_del] [int] NULL,
 CONSTRAINT [PK_ts_function] PRIMARY KEY CLUSTERED 
(
	[function_Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[ts_function] ([function_Id], [function_ParentID], [function_Name], [function_bz], [function_ioc], [function_Url], [function_order], [function_IsCompany], [function_IsProject], [function_depth], [function_isClick], [function_IsTip], [function_del]) VALUES (10000, -1, N'主页', N'主页', N'fa fa-home', NULL, 10, NULL, NULL, 1, N'0', N'0', 0)
INSERT [dbo].[ts_function] ([function_Id], [function_ParentID], [function_Name], [function_bz], [function_ioc], [function_Url], [function_order], [function_IsCompany], [function_IsProject], [function_depth], [function_isClick], [function_IsTip], [function_del]) VALUES (10001, 10000, N'主页示例一', N'主页示例一', N'', NULL, 200, NULL, NULL, 2, N'1', N'0', 0)
INSERT [dbo].[ts_function] ([function_Id], [function_ParentID], [function_Name], [function_bz], [function_ioc], [function_Url], [function_order], [function_IsCompany], [function_IsProject], [function_depth], [function_isClick], [function_IsTip], [function_del]) VALUES (10002, 10000, N'主页示例二', N'主页示例二', N'', NULL, 100, NULL, NULL, 2, N'1', N'0', 0)
INSERT [dbo].[ts_function] ([function_Id], [function_ParentID], [function_Name], [function_bz], [function_ioc], [function_Url], [function_order], [function_IsCompany], [function_IsProject], [function_depth], [function_isClick], [function_IsTip], [function_del]) VALUES (10003, 10000, N'主页示例三', N'主页示例二', N'', NULL, 300, NULL, NULL, 2, N'1', N'0', 0)
INSERT [dbo].[ts_function] ([function_Id], [function_ParentID], [function_Name], [function_bz], [function_ioc], [function_Url], [function_order], [function_IsCompany], [function_IsProject], [function_depth], [function_isClick], [function_IsTip], [function_del]) VALUES (10004, -1, N'新增菜单', N'布局', N'fa fa-home', N'SystemSet/AddMenu.aspx', 20, NULL, NULL, 1, N'1', N'0', 0)
INSERT [dbo].[ts_function] ([function_Id], [function_ParentID], [function_Name], [function_bz], [function_ioc], [function_Url], [function_order], [function_IsCompany], [function_IsProject], [function_depth], [function_isClick], [function_IsTip], [function_del]) VALUES (10005, -1, N'统计图表', N'统计图表', N'fa fa fa-bar-chart-o', NULL, 30, NULL, NULL, 1, N'0', N'0', 0)
INSERT [dbo].[ts_function] ([function_Id], [function_ParentID], [function_Name], [function_bz], [function_ioc], [function_Url], [function_order], [function_IsCompany], [function_IsProject], [function_depth], [function_isClick], [function_IsTip], [function_del]) VALUES (10006, 10005, N'百度ECharts', N'百度ECharts', N'', NULL, 100, NULL, NULL, 2, N'1', N'1', 0)
INSERT [dbo].[ts_function] ([function_Id], [function_ParentID], [function_Name], [function_bz], [function_ioc], [function_Url], [function_order], [function_IsCompany], [function_IsProject], [function_depth], [function_isClick], [function_IsTip], [function_del]) VALUES (10007, 10005, N'图表组合', N'图表组合', N'', NULL, 200, NULL, NULL, 2, N'1', N'0', 0)
INSERT [dbo].[ts_function] ([function_Id], [function_ParentID], [function_Name], [function_bz], [function_ioc], [function_Url], [function_order], [function_IsCompany], [function_IsProject], [function_depth], [function_isClick], [function_IsTip], [function_del]) VALUES (10008, -1, N'信箱', N'信箱', N'fa fa-envelope', N'1.html', 40, NULL, NULL, 1, N'0', N'0', 0)
INSERT [dbo].[ts_function] ([function_Id], [function_ParentID], [function_Name], [function_bz], [function_ioc], [function_Url], [function_order], [function_IsCompany], [function_IsProject], [function_depth], [function_isClick], [function_IsTip], [function_del]) VALUES (10009, 10008, N'收件箱', N'收件箱', NULL, N'ff', 100, NULL, NULL, 2, N'1', N'0', 0)
INSERT [dbo].[ts_function] ([function_Id], [function_ParentID], [function_Name], [function_bz], [function_ioc], [function_Url], [function_order], [function_IsCompany], [function_IsProject], [function_depth], [function_isClick], [function_IsTip], [function_del]) VALUES (10010, 10008, N'发件箱', N'发件箱', NULL, NULL, 200, NULL, NULL, 2, N'1', N'0', 0)
INSERT [dbo].[ts_function] ([function_Id], [function_ParentID], [function_Name], [function_bz], [function_ioc], [function_Url], [function_order], [function_IsCompany], [function_IsProject], [function_depth], [function_isClick], [function_IsTip], [function_del]) VALUES (10011, -1, N'页面', N'页面', N'fa fa-desktop', NULL, 50, NULL, NULL, 1, N'0', N'0', 0)
INSERT [dbo].[ts_function] ([function_Id], [function_ParentID], [function_Name], [function_bz], [function_ioc], [function_Url], [function_order], [function_IsCompany], [function_IsProject], [function_depth], [function_isClick], [function_IsTip], [function_del]) VALUES (10012, 10011, N'项目管理', N'项目管理', NULL, NULL, 100, NULL, NULL, 2, N'0', N'0', 0)
INSERT [dbo].[ts_function] ([function_Id], [function_ParentID], [function_Name], [function_bz], [function_ioc], [function_Url], [function_order], [function_IsCompany], [function_IsProject], [function_depth], [function_isClick], [function_IsTip], [function_del]) VALUES (10013, 10012, N'项目', N'项目', NULL, NULL, 1000, NULL, NULL, 3, N'1', N'0', 0)
INSERT [dbo].[ts_function] ([function_Id], [function_ParentID], [function_Name], [function_bz], [function_ioc], [function_Url], [function_order], [function_IsCompany], [function_IsProject], [function_depth], [function_isClick], [function_IsTip], [function_del]) VALUES (10014, 10012, N'项目详情', N'项目详情', NULL, N'1.html', 1000, NULL, NULL, 3, N'1', N'0', 0)
INSERT [dbo].[ts_function] ([function_Id], [function_ParentID], [function_Name], [function_bz], [function_ioc], [function_Url], [function_order], [function_IsCompany], [function_IsProject], [function_depth], [function_isClick], [function_IsTip], [function_del]) VALUES (10015, 10000, N'主页示例四111', N'主页示例四1111', NULL, NULL, 1000, NULL, NULL, 2, N'1', N'0', 0)
/****** Object:  Default [DF_ts_function_function_isClick]    Script Date: 11/25/2016 18:41:49 ******/
ALTER TABLE [dbo].[ts_function] ADD  CONSTRAINT [DF_ts_function_function_isClick]  DEFAULT ((0)) FOR [function_isClick]
GO
/****** Object:  Default [DF_ts_function_function_IsTip]    Script Date: 11/25/2016 18:41:49 ******/
ALTER TABLE [dbo].[ts_function] ADD  CONSTRAINT [DF_ts_function_function_IsTip]  DEFAULT ((0)) FOR [function_IsTip]
GO
/****** Object:  Default [DF_ts_function_function_del]    Script Date: 11/25/2016 18:41:49 ******/
ALTER TABLE [dbo].[ts_function] ADD  CONSTRAINT [DF_ts_function_function_del]  DEFAULT ((0)) FOR [function_del]
GO
