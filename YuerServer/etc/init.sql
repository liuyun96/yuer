--用户数据
insert into users (user_id,name,passwd,user_name) values(1,'admin','NXjK9rZDiPq07nr/BrO+Uw==','admin');

--菜单数据

INSERT INTO simple_menus (`MENU_ID`, `HTML`, `M_LEVEL`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`, `ICON_CLS`) VALUES (1, '', NULL, NULL, 1, '系统管理', NULL, 1, NULL);
INSERT INTO simple_menus (`MENU_ID`, `HTML`, `M_LEVEL`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`, `ICON_CLS`) VALUES (2, '', 1, 1, 1, '资源管理', 'javascript:createResourcePanel(\'资源管理\');', 3, '');
INSERT INTO simple_menus (`MENU_ID`, `HTML`, `M_LEVEL`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`, `ICON_CLS`) VALUES (3, '', 1, 1, 2, '菜单管理', 'javascript:createSimpleMenusPanel(\'菜单管理\');', 4, '');
INSERT INTO simple_menus (`MENU_ID`, `HTML`, `M_LEVEL`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`, `ICON_CLS`) VALUES (4, '', 1, 1, 3, '用户管理', 'javascript:createUserPanel(\'用户管理\');', 5, NULL);
INSERT INTO simple_menus (`MENU_ID`, `HTML`, `M_LEVEL`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`, `ICON_CLS`) VALUES (5, '', 1, 1, 4, '角色管理', 'javascript:createRolesPanel(\'角色管理\');', 6, NULL);
INSERT INTO simple_menus (`MENU_ID`, `HTML`, `M_LEVEL`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`, `ICON_CLS`) VALUES (6, '', 1, 1, 5, '字典管理', 'javascript:createDictionaryPanel(\'字典管理\');', 9, '');
INSERT INTO simple_menus (`MENU_ID`, `HTML`, `M_LEVEL`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`, `ICON_CLS`) VALUES (7, '', 1, 1, 6, '字典类型管理', 'javascript:createDictTypePanel(\'字典类型管理\');', 8, '');
INSERT INTO simple_menus (`MENU_ID`, `HTML`, `M_LEVEL`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`, `ICON_CLS`) VALUES (8, '', 1, NULL, 2, '后台管理', '', 8, '');


INSERT INTO simple_menus (`MENU_ID`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`) VALUES (9, 8, 1, '文章编辑', 'javascript:createArticlePanel(\'文章编辑\');', 9);
INSERT INTO simple_menus (`MENU_ID`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`) VALUES (10, 8, 2, '栏目管理', 'javascript:createColumnsPanel(\'栏目管理\');', 10);
INSERT INTO simple_menus (`MENU_ID`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`) VALUES (11, 8, 3, '专题管理', 'javascript:createSubjectPanel(\'专题管理\');', 11);
INSERT INTO simple_menus (`MENU_ID`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`) VALUES (12, 8, 4, '我的收藏', 'javascript:createMyFavoritePanel(\'我的收藏\');', 12);
INSERT INTO simple_menus (`MENU_ID`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`) VALUES (13, 8, 5, '商品信息', 'javascript:createItemsPanel(\'商品信息\');', 13);
INSERT INTO simple_menus (`MENU_ID`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`) VALUES (14, 8, 6, '商品评价', 'javascript:createItemCommentPanel(\'商品评价\');', 14);
INSERT INTO simple_menus (`MENU_ID`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`) VALUES (15, 8, 7, '买家信息记录', 'javascript:createBuyerPanel(\'买家信息记录\');', 15);
INSERT INTO simple_menus (`MENU_ID`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`) VALUES (16, 8, 9, '买家订购记录', 'javascript:createBuyerOrderPanel(\'买家订购记录\');', 16);
INSERT INTO simple_menus (`MENU_ID`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`) VALUES (17, 8, 11, '买家留言', 'javascript:createBuyerMessagePanel(\'买家留言\');', 17);
INSERT INTO simple_menus (`MENU_ID`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`) VALUES (18, 8, 10, '买家搜索记录', 'javascript:createBuyerSearchPanel(\'买家搜索记录\');', 18);
INSERT INTO simple_menus (`MENU_ID`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`) VALUES (19, 8, 12, '买家访问记录', 'javascript:createBuyerBrowsePanel(\'买家访问记录\');', 19);
INSERT INTO simple_menus (`MENU_ID`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`) VALUES (20, 8, 12, '页面数据管理', 'javascript:createPageDataPanel(\'页面数据管理\');', 20);
INSERT INTO simple_menus (`MENU_ID`, `PARENT_ID`, `POSITION`, `TITLE`, `URL`, `RESOURCE_ID`) VALUES (21, 8, 13, '数据统计', 'javascript:createDataTotalPanel(\'数据统计\');', 21);


--资源数据
insert into resources(res_id,name,parent_id) select  resource_id,title,parent_id from simple_menus;