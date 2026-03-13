#!/usr/bin/env python3
"""Fetch ORCID works and generate Jekyll markdown posts for each DOI.

Usage: python3 tools/generate_orcid_posts.py

It reads the ORCID iD from _config.yml (field 'orcid') and queries
https://pub.orcid.org/v3.0/{orcid}/works. For each work with a DOI it
creates a file in _posts/ if one does not already exist. The filename
is based on publication year and DOI slug (slashes replaced with '-').

The generated front matter contains title, description (short
summary if available), author roman, date (year-01-01), categories,
tags, and other defaults.  Existing posts are not overwritten unless
run with --overwrite.
"""

import argparse
import os
import re
import sys
import datetime

import requests
import xml.etree.ElementTree as ET
import yaml

CONFIG_PATH = os.path.join(os.path.dirname(__file__), '..', '_config.yml')
POSTS_DIR = os.path.join(os.path.dirname(__file__), '..', '_posts')

NAMESPACES = {
    'common': 'http://www.orcid.org/ns/common',
    'work': 'http://www.orcid.org/ns/work',
    'activities': 'http://www.orcid.org/ns/activities',
}


def load_orcid():
    with open(CONFIG_PATH) as f:
        cfg = yaml.safe_load(f)
    orcid = cfg.get('orcid')
    if not orcid:
        sys.exit('orcid not found in _config.yml')
    return orcid


def slug_from_doi(doi):
    # replace / and other unsafe characters
    return re.sub(r"[^0-9A-Za-z._-]", "-", doi)


def fetch_works(orcid):
    url = f'https://pub.orcid.org/v3.0/{orcid}/works'
    headers = {'Accept': 'application/xml'}
    resp = requests.get(url, headers=headers)
    resp.raise_for_status()
    root = ET.fromstring(resp.text)
    return root.findall('activities:group', NAMESPACES)


def extract_work_info(group):
    # take the first summary in the group
    summ = group.find('work:work-summary', NAMESPACES)
    if summ is None:
        return None
    # title may live under work:title/common:title or common:title
    title_elem = summ.find('work:title/common:title', NAMESPACES)
    if title_elem is None:
        title_elem = summ.find('common:title/common:title', NAMESPACES)
    title = title_elem.text.strip() if title_elem is not None and title_elem.text else 'Untitled'

    # doi
    doi = None
    for eid in summ.findall('common:external-ids/common:external-id', NAMESPACES):
        typ = eid.find('common:external-id-type', NAMESPACES)
        val = eid.find('common:external-id-value', NAMESPACES)
        if typ is not None and val is not None and typ.text.lower() == 'doi':
            doi = val.text.strip()
            break

    if not doi:
        return None  # skip works without doi

    # year
    year = None
    pubdate = summ.find('common:publication-date/common:year', NAMESPACES)
    if pubdate is not None and pubdate.text:
        year = pubdate.text.strip()
    # fallback to created-date
    if not year:
        created = summ.find('common:created-date', NAMESPACES)
        if created is not None and created.text:
            try:
                year = datetime.datetime.fromisoformat(created.text.replace('Z','')).year
            except Exception:
                pass
    if not year:
        year = datetime.datetime.utcnow().year

    # url
    url_elem = summ.find('common:url', NAMESPACES)
    url = url_elem.text.strip() if url_elem is not None and url_elem.text else None

    # summary or short description
    desc_elem = summ.find('common:short-description', NAMESPACES)
    summary = desc_elem.text.strip() if desc_elem is not None and desc_elem.text else ''

    return {'title': title, 'doi': doi, 'year': int(year), 'url': url, 'summary': summary}


def make_filename(info):
    slug = slug_from_doi(info['doi'])
    # default date = year-01-01
    date = datetime.date(info['year'], 1, 1)
    return f"{date.isoformat()}-{slug}.md"


def generate_post(info, path, overwrite=False):
    if os.path.exists(path) and not overwrite:
        print(f'skipping existing {os.path.basename(path)}')
        return
    fm = [
        '---',
        f"title: {info['title']}",
        'description: >-',
        f"  {info['summary'] if info['summary'] else ''}",
        'author: roman',
        f"date: {info['year']}-01-01 00:00:00 +0000",
        'categories: [Research]',
        'tags: [Paper]',
        'math: true',
        'mermaid: true',
        'image:',
        '  path: ',
        '  alt: ',
        "media_subpath: '/commons/images/'",
        'pin: false',
        '---',
        '',
        '## Summary',
        '',
        info['summary'],
        '',
        '## Links',
        '',
        f"- DOI: https://doi.org/{info['doi']}" if info.get('doi') else '',
        f"- URL: {info['url']}" if info.get('url') else '',
        '',
    ]
    with open(path, 'w') as f:
        f.write('\n'.join(line for line in fm if line is not None))
    print(f'created {os.path.basename(path)}')


def main():
    parser = argparse.ArgumentParser(description='Generate Jekyll posts from ORCID works')
    parser.add_argument('--overwrite', action='store_true', help='overwrite existing files')
    args = parser.parse_args()
    orcid = load_orcid()
    groups = fetch_works(orcid)
    for grp in groups:
        info = extract_work_info(grp)
        if not info:
            continue
        fname = make_filename(info)
        path = os.path.join(POSTS_DIR, fname)
        generate_post(info, path, overwrite=args.overwrite)

if __name__ == '__main__':
    main()
