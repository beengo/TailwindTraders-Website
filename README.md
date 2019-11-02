# IDCF  黑客马拉松示例项目 TailwindTraders Web前端项目 部署文档

本文档提供部署说明，请严格按照说明进行部署。

## 部署前提条件

请确保你已经获取了以下信息和环境，以便完成此项目的部署

1. 微软账号：微软账号为 @outlook.com @hotmail.com @live.cn 结尾的邮件地址
2. 黑客松组委会已经将你的微软账号加入对应的 Microsoft Teams, Azure DevOps 以及 Azure 管理控制台，并给你赋予了足够的权限
3. 如果需要进行本地开发调试，请确保提前安装以下软件，您可以在Windows/Mac/Linux环境中安装以下软件，所有软件均提供跨平台版本，请确保通过官方渠道安装以下软件

- [Azure CLI](https://docs.azure.cn/zh-cn/cli/install-azure-cli?view=azure-cli-latest)
- [PowerShell](https://github.com/PowerShell/PowerShell)
- [Helm](https://helm.sh/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)
- [.Net Core 2.2](https://docs.microsoft.com/zh-cn/dotnet/core/)

## 部署步骤

    **注意：以下操作需要一个人独立完成，不可多人同时操作，否则会造成冲突**

### Step 1.1 - Fork本代码库

请在自己团队中协调，使用一名组员自己的GitHub账号作为小组共有环境，并将此repo fork到这个账号中。

### Step 1.2 - 获取流水线配置文件

从本repo的 /Deploy/pipeline 目录下载以下文件

- Website-CI.json
- Website-CD.json

这两个文件包括全部流水线的主要配置，在后续步骤中将会用到。

### Step 2.1 - 导入Build配置文件

使用自己的微软账号登录自己团队的Azure DevOps项目，进入 Pipelines | Builds 并点击 New | Import a Pipeline

![](/Documents/Images/hack/website-build-01.png)

在弹出的对话框中选择 Website-CI.json 文件，并导入

![](/Documents/Images/hack/website-build-02.png)

### Step 2.2 - 构建代理服务和构建代码源配置

在Pipeline设置中选择Azure Pipeline作为Agent Pool，Ubuntu 16.04 作为Agent Specification

![](/Documents/Images/hack/website-build-03.png)

在Get Sources设置中选择Github作为代码源，并点击 New Service Connection 创建一个新的指向到本组的Github账号的service connection。

![](/Documents/Images/hack/website-build-04.png)

使用新创建的service connection获取Github中的repo列表，并选择TailwindTraders-Backend作为本构建的代码源，并选择 master 分支。

![](/Documents/Images/hack/website-build-05.png)

### Step 2.3 - 构建步骤配置

选择 Azure Deployment...步骤，并设置Azure Subscirption为分配给本组的订阅（注意订阅名称中包含的组别信息）

![](/Documents/Images/hack/website-build-06.png)

选择 ARM Outputs...步骤，并设置Azure Subscirption为分配给本组的订阅（注意订阅名称中包含的组别信息）

![](/Documents/Images/hack/website-build-07.png)

选择 Build an image...步骤，并设置Azure Subscirption为分配给本组的订阅（注意订阅名称中包含的组别信息）

![](/Documents/Images/hack/website-build-08.png)

选择 Push an image...步骤，并设置Azure Subscirption为分配给本组的订阅（注意订阅名称中包含的组别信息）

![](/Documents/Images/hack/website-build-09.png)

### Step 2.4 - 保存构建并触发CI

点击顶部的构建名称并修改成Website-CI，点击 Save & queue 按钮保存并触发构建

![](/Documents/Images/hack/website-build-10.png)

在弹出的对话框右下角点击 Save and run

![](/Documents/Images/hack/website-build-11.png)

### Step 2.5 - 监控构建进度

在构建运行界面查看构建进展

![](/Documents/Images/hack/website-build-12.png)

**以下步骤需要等待构建完成方可继续。**

### Step 3.1 - 导入Release配置

切换到Pipeline | Release，并点击 New | Import release pipeline

![](/Documents/Images/hack/website-release-01.png)

在弹出的对话框选择 Website-CD.json 并导入

### Step 3.2 - 配置需要进行部署的制品(artifact))版本

点击 Add an artifact 按钮

![](/Documents/Images/hack/website-release-02.png)

在弹出的对话框中选择以上步骤中创建的Website-CI构建配置作为制品来源，同时选择latest作为制品版本，点击 Add

![](/Documents/Images/hack/website-release-03.png)

### Step 3.3 - 配置部署步骤

点击 Dev 阶段中的告警信息进入此阶段的部署步骤配置

![](/Documents/Images/hack/website-release-04.png)

选择 Azure Pipeline | vs2017-win2016 作为 Agent Job 配置

![](/Documents/Images/hack/website-release-05.png)

选择 Azure CLI...步骤，并设置Azure Subscirption为分配给本组的订阅（注意订阅名称中包含的组别信息）

![](/Documents/Images/hack/website-release-06.png)

选择 Deploy Container ...步骤，并设置Azure Subscirption为分配给本组的订阅（注意订阅名称中包含的组别信息），同时选择 App Service name 下拉菜单中唯一的选项

![](/Documents/Images/hack/website-release-07.png)

选择 Restart Azure App Service ...步骤，并设置Azure Subscirption为分配给本组的订阅（注意订阅名称中包含的组别信息），同时选择 App Service name 下拉菜单中不含func关键字的选项

![](/Documents/Images/hack/website-release-08.png)

### Step 3.4 - 配置部署变量

进入Azure Portal (https://portal.azure.com) 获取容器注册表相关信息，在Azure Portal中选择 **资源组 | TailwindTraderWeb | 容器注册表**

![](/Documents/Images/hack/website-release-09.png)

进入 **访问密钥** 页面获取右侧所有信息，备用。

![](/Documents/Images/hack/website-release-10.png)

回到 Azure DevOps 的部署流水线配置中的 Variable 页面，按照从 Azure Portal中获取的信息填写以下变量

  - ACR_LoginServer：注册表名称
  - ACR_PASSWORD: 注册表password
  - ACR_USERNAME: 用户名
  - appservice-name：从步骤3.3中复制App Service name

![](/Documents/Images/hack/website-release-11.png)

### Step 3.5 - 保存触发并监控进度

完成修改后点击 Create release 按钮触发部署

![](/Documents/Images/hack/website-release-12.png)

在弹出的对话框中选择Create

![](/Documents/Images/hack/website-release-13.png)

等待一段时间后部署启动，可以通过点击 logs 查看日志

![](/Documents/Images/hack/website-release-14.png)

**等待部署成功后进行后续步骤。**

### Step 4.1 - 获取后台应用API地址

进入**Azure Portal | 资源组 | TailwindTradersBackend** 并点击 **Kubernetes 服务**

![](/Documents/Images/hack/azure-config-01.png)

获取 **HTTP应用程序路由域 **字段的值

![](/Documents/Images/hack/azure-config-02.png)

### Step 4.2 - 更新Web应用程序配置，指向以上获取的HTTP应用程序路由域地址

进入**Azure Portal | 资源组 | TailwindTradersWeb* 并点击 **应用服务**

![](/Documents/Images/hack/azure-config-03.png)

进入 **配置** 页面，点击 **显示值** 并更新以下地址

  - ApiUrl = https://[HTTP应用程序路由域]/webbff/v1
  - ApiUrlShoppingCart = https://[HTTP应用程序路由域]/cart-api

![](/Documents/Images/hack/azure-config-04.png)

### Step 5 - 测试站点工作正常

通过 **应用服务** 的页面获取网站地址

![](/Documents/Images/hack/azure-config-05.png)

点击以上 URL 即可访问站点

![](/Documents/Images/hack/running-website.png)

***恭喜，部署完成！***
