#!/bin/sh

set -e

text=${INPUT_TEXT}
regex=${INPUT_REGEX}

if echo "${text}" | grep -Eq "${regex}"; then
    echo "::set-output name=match::true"
    exit 0
fi

echo "::set-output name=match::false"
