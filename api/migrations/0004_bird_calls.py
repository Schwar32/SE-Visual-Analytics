# Generated by Django 4.1.2 on 2022-10-06 04:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_bird_calls'),
    ]

    operations = [
        migrations.AddField(
            model_name='bird',
            name='calls',
            field=models.FileField(default='', upload_to=''),
        ),
    ]
