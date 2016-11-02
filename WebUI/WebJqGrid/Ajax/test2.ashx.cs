﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebJqGrid.Ajax
{
    /// <summary>
    /// test2 的摘要说明
    /// </summary>
    public class test2 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            String type = context.Request["type"];
            String jsondata = "{}";
            if (type=="0")
            {
                String page = context.Request["page"];
                if ("1".Equals(page))
                {
                    jsondata = "{\"page\":\"1\"," +
                        "      \"total\":2," +
                        "      \"records\":\"13\"," +
                        "      \"rows\":" +
                        "          [" +
                        "            {" +
                        "              \"id\":\"13\"," +
                        "              \"cell\":" +
                        "                  [\"13\",\"2007-10-06\",\"Client 3\",\"1000.00\",\"0.00\",\"1000.00\",null]" +
                        "            }," +
                        "            {" +
                        "              \"id\":\"12\"," +
                        "              \"cell\":" +
                        "                  [\"12\",\"2007-10-06\",\"Client 2\",\"700.00\",\"140.00\",\"840.00\",null]" +
                        "            }," +
                        "            {" +
                        "              \"id\":\"11\"," +
                        "              \"cell\":" +
                        "                  [\"11\",\"2007-10-06\",\"Client 1\",\"600.00\",\"120.00\",\"720.00\",null]" +
                        "            }," +
                        "            {" +
                        "              \"id\":\"10\"," +
                        "              \"cell\":" +
                        "                  [\"10\",\"2007-10-06\",\"Client 2\",\"100.00\",\"20.00\",\"120.00\",null]" +
                        "            }," +
                        "            {" +
                        "              \"id\":\"9\"," +
                        "              \"cell\":" +
                        "                  [\"9\",\"2007-10-06\",\"Client 1\",\"200.00\",\"40.00\",\"240.00\",null]" +
                        "            }," +
                        "            {" +
                        "              \"id\":\"8\"," +
                        "              \"cell\":" +
                        "                  [\"8\",\"2007-10-06\",\"Client 3\",\"200.00\",\"0.00\",\"200.00\",null]" +
                        "            }," +
                        "            {" +
                        "              \"id\":\"7\"," +
                        "              \"cell\":" +
                        "                  [\"7\",\"2007-10-05\",\"Client 2\",\"120.00\",\"12.00\",\"134.00\",null]" +
                        "            }," +
                        "            {" +
                        "              \"id\":\"6\"," +
                        "              \"cell\":" +
                        "                  [\"6\",\"2007-10-05\",\"Client 1\",\"50.00\",\"10.00\",\"60.00\",\"\"]" +
                        "            }," +
                        "            {" +
                        "              \"id\":\"5\"," +
                        "              \"cell\":" +
                        "                  [\"5\",\"2007-10-05\",\"Client 3\",\"100.00\",\"0.00\",\"100.00\",\"no tax at all\"]" +
                        "            }," +
                        "            {" +
                        "              \"id\":\"4\"," +
                        "              \"cell\":" +
                        "                  [\"4\",\"2007-10-04\",\"Client 3\",\"150.00\",\"0.00\",\"150.00\",\"no tax\"]" +
                        "            }" +
                        "          ]," +
                        "      \"userdata\":{\"amount\":3220,\"tax\":342,\"total\":3564,\"name\":\"Totals:\"}" +
                        "    }";
                }
                else
                {
                    jsondata = "{" +
                        "    \"page\":\"2\"," +
                        "    \"total\":2," +
                        "    \"records\":\"13\"," +
                        "    \"rows\":[" +
                        "      {" +
                        "        \"id\":\"3\"," +
                        "        \"cell\":[\"3\",\"2007-10-02\",\"Client 2\",\"300.00\",\"60.00\",\"360.00\",\"note invoice 3 & and amp test\"]" +
                        "      }," +
                        "      {" +
                        "        \"id\":\"2\"," +
                        "        \"cell\":[\"2\",\"2007-10-03\",\"Client 1\",\"200.00\",\"40.00\",\"240.00\",\"note 2\"]" +
                        "      }," +
                        "      {" +
                        "        \"id\":\"1\"," +
                        "        \"cell\":[\"1\",\"2007-10-01\",\"Client 1\",\"100.00\",\"20.00\",\"120.00\",\"note 1\"]" +
                        "      }" +
                        "    ]," +
                        "    \"userdata\":{\"amount\":600,\"tax\":120,\"total\":720,\"name\":\"Totals:\"}}";
                }
            }
            else
            {
                String id = context.Request["id"];
                int iId = Convert.ToInt32(id); 
                switch (iId)
                {
                    case 13:
                        jsondata = "{" +
                            "    \"page\":\"1\"," +
                            "    \"total\":1," +
                            "    \"records\":\"1\"," +
                            "    \"rows\":[" +
                            "      {" +
                            "        \"id\":\"1\"," +
                            "        \"cell\":[\"1\",\"item 13\",\"1.00\",\"1000.00\",\"1 000.00\"]" +
                            "      }" +
                            "    ]" +
                            "  }";
                        break;
                    case 12:
                        jsondata = "{" +
                            "    \"page\":\"1\"," +
                            "    \"total\":1," +
                            "    \"records\":\"2\"," +
                            "    \"rows\":[" +
                            "      {" +
                            "        \"id\":\"2\"," +
                            "        \"cell\":[\"2\",\"item 2\",\"1.00\",\"400.00\",\"400.00\"]" +
                            "      }," +
                            "      {" +
                            "        \"id\":\"1\"," +
                            "        \"cell\":[\"1\",\"item 4\",\"1.00\",\"300.00\",\"300.00\"]" +
                            "      }" +
                            "    ]" +
                            "  }";
                        break;
                    case 11:
                        jsondata = "{" +
                            "    \"page\":\"1\"," +
                            "    \"total\":1," +
                            "    \"records\":\"4\"," +
                            "    \"rows\":[" +
                            "      {" +
                            "        \"id\":\"1\"," +
                            "        \"cell\":[\"1\",\"item 1\",\"2.00\",\"100.00\",\"200.00\"]" +
                            "      }," +
                            "      {" +
                            "        \"id\":\"2\"," +
                            "        \"cell\":[\"2\",\"item 2\",\"3.00\",\"50.00\",\"150.00\"]" +
                            "      }," +
                            "      {" +
                            "        \"id\":\"3\"," +
                            "        \"cell\":[\"3\",\"item 3\",\"1.00\",\"50.00\",\"50.00\"]" +
                            "      }," +
                            "      {" +
                            "        \"id\":\"4\"," +
                            "        \"cell\":[\"4\",\"item 4\",\"1.00\",\"200.00\",\"200.00\"]" +
                            "      }" +
                            "    ]" +
                            "  }";
                        break;
                    case 10:
                        jsondata = "{" +
                            "    \"page\":\"1\"," +
                            "    \"total\":1," +
                            "    \"records\":\"2\"," +
                            "    \"rows\":[" +
                            "      {" +
                            "        \"id\":\"2\"," +
                            "        \"cell\":[\"2\",\"item 4\",\"1.00\",\"70.00\",\"70.00\"]" +
                            "      }," +
                            "      {" +
                            "        \"id\":\"1\"," +
                            "        \"cell\":[\"1\",\"item 5\",\"3.00\",\"10.00\",\"30.00\"]" +
                            "      }" +
                            "    ]" +
                            "  }";
                        break;
                    case 9:
                        jsondata = "{" +
                            "    \"page\":\"1\"," +
                            "    \"total\":1," +
                            "    \"records\":\"2\"," +
                            "    \"rows\":[" +
                            "      {" +
                            "        \"id\":\"2\"," +
                            "        \"cell\":[\"2\",\"item 3\",\"1.00\",\"60.00\",\"60.00\"]" +
                            "      }," +
                            "      {" +
                            "        \"id\":\"1\"," +
                            "        \"cell\":[\"1\",\"item 6\",\"1.00\",\"140.00\",\"140.00\"]" +
                            "      }" +
                            "    ]" +
                            "  }";
                        break;
                    case 8:
                        jsondata = "{" +
                            "    \"page\":\"1\"," +
                            "    \"total\":1," +
                            "    \"records\":\"3\"," +
                            "    \"rows\":[" +
                            "      {" +
                            "        \"id\":\"2\"," +
                            "        \"cell\":[\"2\",\"item 2\",\"1.00\",\"120.00\",\"120.00\"]" +
                            "      }," +
                            "      {" +
                            "        \"id\":\"1\"," +
                            "        \"cell\":[\"1\",\"item 3\",\"1.00\",\"50.00\",\"50.00\"]" +
                            "      }," +
                            "      {" +
                            "        \"id\":\"3\"," +
                            "        \"cell\":[\"3\",\"item 3\",\"1.00\",\"30.00\",\"30.00\"]" +
                            "      }" +
                            "    ]" +
                            "  }";
                        break;
                    case 7:
                        jsondata = "{" +
                            "    \"page\":\"1\"," +
                            "    \"total\":1," +
                            "    \"records\":\"2\"," +
                            "    \"rows\":[" +
                            "      {" +
                            "        \"id\":\"2\"," +
                            "        \"cell\":[\"2\",\"item 1\",\"1.00\",\"100.00\",\"100.00\"]" +
                            "      }," +
                            "      {" +
                            "        \"id\":\"1\"," +
                            "        \"cell\":[\"1\",\"item 5\",\"2.00\",\"10.00\",\"20.00\"]" +
                            "      }" +
                            "    ]" +
                            "  }";
                        break;
                    case 6:
                        jsondata = "{" +
                            "    \"page\":\"1\"," +
                            "    \"total\":1," +
                            "    \"records\":\"1\"," +
                            "    \"rows\":[" +
                            "      {" +
                            "        \"id\":\"1\"," +
                            "        \"cell\":[\"1\",\"item 4\",\"1.00\",\"50.00\",\"50.00\"]" +
                            "      }" +
                            "    ]" +
                            "  }";
                        break;
                    case 5:
                        jsondata = "{" +
                            "    \"page\":\"1\"," +
                            "    \"total\":1," +
                            "    \"records\":\"1\"," +
                            "    \"rows\":[" +
                            "      {" +
                            "        \"id\":\"1\"," +
                            "        \"cell\":[\"1\",\"item 3\",\"1.00\",\"100.00\",\"100.00\"]" +
                            "      }" +
                            "    ]" +
                            "  }";
                        break;
                    case 4:
                        jsondata = "{" +
                            "    \"page\":\"1\"," +
                            "    \"total\":1," +
                            "    \"records\":\"2\"," +
                            "    \"rows\":[" +
                            "      {" +
                            "        \"id\":\"1\"," +
                            "        \"cell\":[\"1\",\"item 1\",\"1.00\",\"100.00\",\"100.00\"]" +
                            "      }," +
                            "      {" +
                            "        \"id\":\"2\"," +
                            "        \"cell\":[\"2\",\"item 2\",\"1.00\",\"50.00\",\"50.00\"]" +
                            "      }" +
                            "    ]" +
                            "  }";
                        break;
                    case 3:
                        jsondata = "{" +
                            "    \"page\":\"1\"," +
                            "    \"total\":1," +
                            "    \"records\":\"2\"," +
                            "    \"rows\":[" +
                            "      {" +
                            "        \"id\":\"1\"," +
                            "        \"cell\":[\"1\",\"item 3\",\"1.00\",\"100.00\",\"100.00\"]" +
                            "      }," +
                            "      {" +
                            "        \"id\":\"2\"," +
                            "        \"cell\":[\"2\",\"item 4\",\"1.00\",\"200.00\",\"200.00\"]" +
                            "      }" +
                            "    ]" +
                            "  }";
                        break;
                    case 2:
                        jsondata = "{" +
                            "    \"page\":\"1\"," +
                            "    \"total\":1," +
                            "    \"records\":\"2\"," +
                            "    \"rows\":[" +
                            "      {" +
                            "        \"id\":\"1\"," +
                            "        \"cell\":[\"1\",\"item 1\",\"2.00\",\"20.00\",\"40.00\"]" +
                            "      }," +
                            "      {" +
                            "        \"id\":\"2\"," +
                            "        \"cell\":[\"2\",\"item 2\",\"4.00\",\"40.00\",\"160.00\"]" +
                            "      }" +
                            "    ]" +
                            "  }";
                        break;
                    case 1:
                        jsondata = "{" +
                            "    \"page\":\"1\"," +
                            "    \"total\":1," +
                            "    \"records\":\"2\"," +
                            "    \"rows\":[" +
                            "      {" +
                            "        \"id\":\"1\"," +
                            "        \"cell\":[\"1\",\"item 1\",\"1.00\",\"20.00\",\"20.00\"]" +
                            "      }," +
                            "      {" +
                            "        \"id\":\"2\"," +
                            "        \"cell\":[\"2\",\"item 2\",\"2.00\",\"40.00\",\"80.00\"]" +
                            "      }" +
                            "    ]" +
                            "  }";
                        break;
                    default:
                        break;
                }
            }
          
            context.Response.Write(jsondata);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}