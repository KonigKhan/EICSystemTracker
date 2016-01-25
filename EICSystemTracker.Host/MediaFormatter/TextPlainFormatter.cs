using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;

namespace EICSystemTracker.Host.MediaFormatter
{
    public class TextPlainFormatter : MediaTypeFormatter
    {
        public TextPlainFormatter()
        {
            this.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/plain"));
        }

        public override bool CanWriteType(Type type)
        {
            return type == typeof(string);
        }

        public override bool CanReadType(Type type)
        {
            return type == typeof(string);
        }

        public override Task WriteToStreamAsync(Type type, object value, Stream writeStream, HttpContent content,
            TransportContext transportContext)
        {
            return Task.Factory.StartNew(() =>
            {
                StreamWriter writer = new StreamWriter(writeStream);
                writer.Write(value);
                writer.Flush();
            });
        }

        public override Task WriteToStreamAsync(Type type, object value, Stream writeStream, HttpContent content,
            TransportContext transportContext, CancellationToken cancellationToken)
        {
            return Task.Factory.StartNew(() =>
            {
                StreamReader reader = new StreamReader(writeStream);
                return (object)reader.ReadToEnd();
            });
        }
    }
}